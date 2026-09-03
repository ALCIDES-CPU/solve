"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileCheck, Shield, Lock, Loader2 } from "lucide-react"
import { formatPrice, getServicePrice, type ServiceType } from "@/lib/service-prices"

const SERVICE_NAMES: Record<ServiceType, string> = {
  "agendamento-geral": "Agendamento Geral AIMA",
  "renovacao-autorizacao": "Renovação de Autorização de Residência",
  "primeira-autorizacao": "Primeira Autorização de Residência",
  "reagrupamento-familiar": "Reagrupamento Familiar",
  "informacao-consulta": "Manifestação de interesse / CPLP",
  otros: "Outros Serviços",
}

type BillingData = {
  emailFaturacao: string
  telefoneFaturacao: string
  nif: string
  endereco: string
  codigoPostal: string
  cidade: string
  paisFaturacao: string
}

type DocumentData = {
  nomeDocumento: string
  numeroDocumento: string
  mesEmissao: string
  anoEmissao: string
  numeroRua: string
}

export function DocumentPaymentForm() {
  const router = useRouter()
  const params = useSearchParams()
  const serviceType = (params.get("service") || "agendamento-geral") as ServiceType
  const valor = getServicePrice(serviceType)

  const [billingData, setBillingData] = useState<BillingData | null>(null)
  const [form, setForm] = useState<DocumentData>({
    nomeDocumento: "",
    numeroDocumento: "",
    mesEmissao: "",
    anoEmissao: "",
    numeroRua: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Recuperar dados de faturação do sessionStorage
    const stored = sessionStorage.getItem("billingData")
    if (!stored) {
      router.push("/checkout")
      return
    }
    try {
      const data = JSON.parse(stored) as BillingData
      setBillingData(data)
    } catch {
      router.push("/checkout")
    }
  }, [router])

  const update = (key: keyof DocumentData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!form.nomeDocumento.trim()) next.nomeDocumento = "Nome é obrigatório"
    if (!form.numeroDocumento.trim()) next.numeroDocumento = "Número do documento é obrigatório"
    if (!form.mesEmissao) next.mesEmissao = "Mês de emissão é obrigatório"
    else if (parseInt(form.mesEmissao) < 1 || parseInt(form.mesEmissao) > 12)
      next.mesEmissao = "Mês deve estar entre 1 e 12"
    if (!form.anoEmissao) next.anoEmissao = "Ano de emissão é obrigatório"
    else if (!/^\d{4}$/.test(form.anoEmissao)) next.anoEmissao = "Ano deve ter 4 dígitos"
    if (!form.numeroRua.trim()) next.numeroRua = "Número da rua é obrigatório"
    setErrors(next)
    return !Object.keys(next).length
  }

  function openConfirmation(event: React.FormEvent) {
    event.preventDefault()
    if (validate()) setOpen(true)
  }

  async function confirmPayment() {
    setLoading(true)
    setErrors({})

    const paymentData = {
      agendamentoId: sessionStorage.getItem("agendamentoId"),
      referencia: sessionStorage.getItem("referencia"),
      agendamentoData: sessionStorage.getItem("appointmentData")
        ? JSON.parse(sessionStorage.getItem("appointmentData")!)
        : null,
      ...billingData,
      ...form,
      servico: serviceType,
      servicoNome: SERVICE_NAMES[serviceType],
      valor: valor.toFixed(2),
      moeda: "EUR",
      estado: "submetido",
      submittedAt: new Date().toISOString(),
    }

    try {
      const response = await fetch("/api/pagamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentData }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.error)
      setOpen(false)
      sessionStorage.removeItem("billingData")
      sessionStorage.removeItem("appointmentData")
      sessionStorage.removeItem("agendamentoId")
      sessionStorage.removeItem("referencia")
      router.push("/confirmacao")
    } catch (error) {
      setOpen(false)
      setErrors({ submit: error instanceof Error ? error.message : "Não foi possível registar o pedido." })
    } finally {
      setLoading(false)
    }
  }

  if (!billingData) return null

  const fields: [keyof DocumentData, string, string][] = [
    ["nomeDocumento", "Nome Completo", "text"],
    ["numeroDocumento", "Número do Documento", "text"],
    ["mesEmissao", "Mês de Emissão (1-12)", "number"],
    ["anoEmissao", "Ano de Emissão (ex: 2020)", "number"],
    ["numeroRua", "Número da Rua", "text"],
  ]

  return (
    <>
      <form onSubmit={openConfirmation} className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Dados do Documento
              </CardTitle>
              <CardDescription>Preencha os dados do seu documento de identificação</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {fields.map(([key, label, type]) => (
                <div
                  key={key}
                  className={key === "numeroRua" ? "sm:col-span-2 space-y-2" : "space-y-2"}
                >
                  <Label htmlFor={key}>
                    {label}
                    <span className="text-destructive"> *</span>
                  </Label>
                  <Input
                    id={key}
                    type={type}
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
                    className={errors[key] ? "border-destructive" : ""}
                    placeholder={
                      key === "mesEmissao"
                        ? "1-12"
                        : key === "anoEmissao"
                          ? "ex: 2020"
                          : undefined
                    }
                  />
                  {errors[key] && <p className="text-sm text-destructive">{errors[key]}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="lg:sticky lg:top-28">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
              <CardDescription>{SERVICE_NAMES[serviceType]}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between border-b pb-4">
                <span>Valor registado</span>
                <strong className="text-xl">{formatPrice(valor)}</strong>
              </div>

              {billingData?.endereco && (
                <p className="text-sm text-muted-foreground">
                  Endereço: <strong>{billingData.endereco}</strong>
                </p>
              )}

              <div className="flex gap-3 rounded-lg border bg-muted/40 p-3 text-sm">
                <Shield className="h-5 w-5 shrink-0 text-primary" />
                <span>Ao clicar em confirmar, o pedido será registado com todos os seus dados.</span>
              </div>

              {errors.submit && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" size="lg">
                Confirmar Registo
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Registo do Documento</DialogTitle>
            <DialogDescription>Verifique os dados do documento antes de confirmar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nome:</span>
                <strong>{form.nomeDocumento}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número do Documento:</span>
                <strong>{form.numeroDocumento}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Emissão:</span>
                <strong>
                  {form.mesEmissao}/{form.anoEmissao}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número da Rua:</span>
                <strong>{form.numeroRua}</strong>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span>Total</span>
                <strong className="text-lg">{formatPrice(valor)}</strong>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border p-3 text-sm">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <span>Todos os dados serão guardados de forma segura no Supabase.</span>
            </div>

            <Button onClick={confirmPayment} disabled={loading} className="w-full" size="lg">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar e Registar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
