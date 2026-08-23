"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader as Loader2, FileCheck, Shield, Lock } from "lucide-react"
import { formatPrice, getServicePrice, type ServiceType } from "@/lib/service-prices"

const SERVICE_NAMES: Record<ServiceType, string> = {
  "agendamento-geral": "Agendamento Geral AIMA", "renovacao-autorizacao": "Renovação de Autorização de Residência", "primeira-autorizacao": "Primeira Autorização de Residência", "reagrupamento-familiar": "Reagrupamento Familiar", "informacao-consulta": "Manifestação de interesse / CPLP", otros: "Outros Serviços",
}

export function CheckoutForm() {
  const router = useRouter(); const params = useSearchParams()
  const serviceType = (params.get("service") || "agendamento-geral") as ServiceType
  const valor = getServicePrice(serviceType)
  const [agendamento, setAgendamento] = useState<{ agendamentoId?: string; referencia?: string; nomeCompleto?: string; email?: string; telefone?: string } | null>(null)
  const [form, setForm] = useState({ emailFaturacao: "", telefoneFaturacao: "", nif: "", endereco: "", codigoPostal: "", cidade: "", paisFaturacao: "Portugal" })
  const [errors, setErrors] = useState<Record<string, string>>({}); const [loading, setLoading] = useState(false)

  useEffect(() => { const stored = sessionStorage.getItem("appointmentData"); if (!stored) return; try { const data = JSON.parse(stored); setAgendamento(data); setForm(prev => ({ ...prev, emailFaturacao: data.email ?? "", telefoneFaturacao: data.telefone ?? "" })) } catch {} }, [])
  const update = (key: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [key]: value }))
  function validate() { const next: Record<string, string> = {}; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailFaturacao)) next.emailFaturacao = "E-mail válido é obrigatório"; if (!form.endereco.trim()) next.endereco = "Endereço é obrigatório"; if (!form.codigoPostal.trim()) next.codigoPostal = "Código postal é obrigatório"; if (!form.cidade.trim()) next.cidade = "Cidade é obrigatória"; setErrors(next); return !Object.keys(next).length }
  async function submit(event: React.FormEvent) { event.preventDefault(); if (!validate()) return; setLoading(true); setErrors({}); try { const response = await fetch("/api/pagamentos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paymentData: { agendamentoId: agendamento?.agendamentoId ?? null, referencia: agendamento?.referencia ?? null, ...form, servico: serviceType, servicoNome: SERVICE_NAMES[serviceType], valor: valor.toFixed(2), moeda: "EUR", submittedAt: new Date().toISOString() } }) }); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error); router.push("/confirmacao") } catch (error) { setErrors({ submit: error instanceof Error ? error.message : "Não foi possível registar o pedido." }) } finally { setLoading(false) } }
  return <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-5"><div className="lg:col-span-3"><Card><CardHeader><CardTitle className="flex items-center gap-2"><FileCheck className="h-5 w-5 text-primary" />Registo de pagamento</CardTitle><CardDescription>Não recolhemos nem armazenamos dados de cartão. Este passo regista apenas a intenção de pagamento e os dados de faturação.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">{([['emailFaturacao','E-mail','email'],['telefoneFaturacao','Telemóvel','tel'],['nif','NIF (opcional)','text'],['endereco','Endereço','text'],['codigoPostal','Código postal','text'],['cidade','Cidade','text'],['paisFaturacao','País','text']] as const).map(([key,label,type]) => <div key={key} className={key === 'endereco' ? 'sm:col-span-2 space-y-2' : 'space-y-2'}><Label htmlFor={key}>{label}{['emailFaturacao','endereco','codigoPostal','cidade'].includes(key) && <span className="text-destructive"> *</span>}</Label><Input id={key} type={type} value={form[key]} onChange={e => update(key, e.target.value)} className={errors[key] ? 'border-destructive' : ''} />{errors[key] && <p className="text-sm text-destructive">{errors[key]}</p>}</div>)} </CardContent></Card></div><div className="lg:col-span-2"><Card className="lg:sticky lg:top-28"><CardHeader><CardTitle>Resumo do pedido</CardTitle><CardDescription>{SERVICE_NAMES[serviceType]}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="flex items-center justify-between border-b pb-4"><span>Valor registado</span><strong className="text-xl">{formatPrice(valor)}</strong></div>{agendamento?.referencia && <p className="text-sm text-muted-foreground">Referência: <strong>{agendamento.referencia}</strong></p>}<div className="flex gap-3 rounded-lg border bg-muted/40 p-3 text-sm"><Shield className="h-5 w-5 shrink-0 text-primary" /><span>O site não solicita, transmite ou guarda número de cartão, CVV ou validade.</span></div>{errors.submit && <Alert variant="destructive"><AlertDescription>{errors.submit}</AlertDescription></Alert>}<Button type="submit" className="w-full" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />A registar…</> : <><Lock className="mr-2 h-4 w-4" />Registar pedido</>}</Button></CardContent></Card></div></form>
}
