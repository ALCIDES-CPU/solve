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

type Appointment = { agendamentoId?: string; referencia?: string; email?: string; telefone?: string }
type Billing = { emailFaturacao: string; telefoneFaturacao: string; nif: string; endereco: string; codigoPostal: string; cidade: string; paisFaturacao: string }

export function CheckoutForm() {
  const router = useRouter()
  const params = useSearchParams()
  const serviceType = (params.get("service") || "agendamento-geral") as ServiceType
  const valor = getServicePrice(serviceType)
  const [agendamento, setAgendamento] = useState<Appointment | null>(null)
  const [form, setForm] = useState<Billing>({ emailFaturacao: "", telefoneFaturacao: "", nif: "", endereco: "", codigoPostal: "", cidade: "", paisFaturacao: "Portugal" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("appointmentData")
    if (!stored) return
    try {
      const data = JSON.parse(stored) as Appointment
      setAgendamento(data)
      setForm((prev) => ({ ...prev, emailFaturacao: data.email ?? "", telefoneFaturacao: data.telefone ?? "" }))
    } catch { /* dados inválidos são ignorados */ }
  }, [])

  const update = (key: keyof Billing, value: string) => setForm((prev) => ({ ...prev, [key]: value }))
  function validate() {
    const next: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailFaturacao)) next.emailFaturacao = "E-mail válido é obrigatório"
    if (!form.endereco.trim()) next.endereco = "Endereço é obrigatório"
    if (!form.codigoPostal.trim()) next.codigoPostal = "Código postal é obrigatório"
    if (!form.cidade.trim()) next.cidade = "Cidade é obrigatória"
    setErrors(next)
    return !Object.keys(next).length
  }

  function openPayment(event: React.FormEvent) {
    event.preventDefault()
    if (validate()) setOpen(true)
  }

  async function confirmPayment() {
    setLoading(true)
    setErrors({})
    const paymentData = {
      // Mantém a referência ao agendamento e inclui todos os dados originais
      // para que o checkout seja auditável no registo de pagamento.
      agendamentoId: agendamento?.agendamentoId ?? null,
      referencia: agendamento?.referencia ?? null,
      agendamentoData: agendamento,
      ...form,
      servico: serviceType,
      servicoNome: SERVICE_NAMES[serviceType],
      valor: valor.toFixed(2),
      moeda: "EUR",
      estado: "submetido",
      submittedAt: new Date().toISOString(),
    }
    try {
      const response = await fetch("/api/pagamentos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paymentData }) })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.error)
      setOpen(false)
      router.push("/confirmacao")
    } catch (error) {
      setOpen(false)
      setErrors({ submit: error instanceof Error ? error.message : "Não foi possível registar o pedido." })
    } finally { setLoading(false) }
  }

  const fields: [keyof Billing, string, string][] = [["emailFaturacao", "E-mail", "email"], ["telefoneFaturacao", "Telemóvel", "tel"], ["nif", "NIF (opcional)", "text"], ["endereco", "Endereço", "text"], ["codigoPostal", "Código postal", "text"], ["cidade", "Cidade", "text"], ["paisFaturacao", "País", "text"]]
  return <>
    <form onSubmit={openPayment} className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3"><Card><CardHeader><CardTitle className="flex items-center gap-2"><FileCheck className="h-5 w-5 text-primary" />Dados de faturação</CardTitle><CardDescription>O site não solicita nem armazena número de cartão, CVV ou validade.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">{fields.map(([key, label, type]) => <div key={key} className={key === "endereco" ? "sm:col-span-2 space-y-2" : "space-y-2"}><Label htmlFor={key}>{label}{["emailFaturacao", "endereco", "codigoPostal", "cidade"].includes(key) && <span className="text-destructive"> *</span>}</Label><Input id={key} type={type} value={form[key]} onChange={(e) => update(key, e.target.value)} className={errors[key] ? "border-destructive" : ""} />{errors[key] && <p className="text-sm text-destructive">{errors[key]}</p>}</div>)}</CardContent></Card></div>
      <div className="lg:col-span-2"><Card className="lg:sticky lg:top-28"><CardHeader><CardTitle>Resumo do pedido</CardTitle><CardDescription>{SERVICE_NAMES[serviceType]}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex items-center justify-between border-b pb-4"><span>Valor registado</span><strong className="text-xl">{formatPrice(valor)}</strong></div>{agendamento?.referencia && <p className="text-sm text-muted-foreground">Referência: <strong>{agendamento.referencia}</strong></p>}<div className="flex gap-3 rounded-lg border bg-muted/40 p-3 text-sm"><Shield className="h-5 w-5 shrink-0 text-primary" /><span>Ao clicar em pagar, abrirá uma janela de confirmação. Nenhum dado de cartão é recolhido.</span></div>{errors.submit && <Alert variant="destructive"><AlertDescription>{errors.submit}</AlertDescription></Alert>}<Button type="submit" className="w-full" size="lg">Pagar {formatPrice(valor)}</Button></CardContent></Card></div>
    </form>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Finalizar pagamento</DialogTitle><DialogDescription>Confirme o registo do pedido e os dados de faturação.</DialogDescription></DialogHeader><div className="space-y-4"><div className="rounded-lg bg-muted/50 p-4"><div className="flex justify-between text-sm"><span>Serviço</span><strong>{SERVICE_NAMES[serviceType]}</strong></div><div className="mt-3 flex justify-between border-t pt-3"><span>Total</span><strong className="text-lg">{formatPrice(valor)}</strong></div></div><div className="flex gap-3 rounded-lg border p-3 text-sm"><Lock className="h-5 w-5 shrink-0 text-primary" /><span>Este site apenas regista o pedido. Não guardamos dados de cartão.</span></div><Button onClick={confirmPayment} disabled={loading} className="w-full" size="lg">{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Confirmar pagamento</Button></div></DialogContent></Dialog>
  </>
}
