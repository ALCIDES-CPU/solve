"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Row = Record<string, unknown> & { id: string; referencia?: string; estado?: string; email?: string; criado_em?: string }
export function AdminDashboard({ initialAppointments, initialPayments }: { initialAppointments: Row[]; initialPayments: Row[] }) {
  const [query, setQuery] = useState(""); const [tab, setTab] = useState<"appointments" | "payments">("appointments")
  const rows = (tab === "appointments" ? initialAppointments : initialPayments).filter(row => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()))
  async function logout() { await createClient().auth.signOut(); window.location.href = "/admin/login" }
  return <main className="min-h-screen bg-muted/30 p-6 md:p-10"><div className="mx-auto max-w-7xl space-y-6"><header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-primary">Backoffice</p><h1 className="text-3xl font-bold tracking-tight">Dados submetidos</h1><p className="text-muted-foreground">Consulta segura dos registos guardados no Supabase.</p></div><Button variant="outline" onClick={logout}>Terminar sessão</Button></header><div className="flex flex-col gap-3 sm:flex-row"><Button variant={tab === "appointments" ? "default" : "outline"} onClick={() => setTab("appointments")}>Agendamentos ({initialAppointments.length})</Button><Button variant={tab === "payments" ? "default" : "outline"} onClick={() => setTab("payments")}>Pagamentos ({initialPayments.length})</Button><Input className="sm:ml-auto sm:max-w-xs" placeholder="Pesquisar registos…" value={query} onChange={e => setQuery(e.target.value)} /></div><Card><CardHeader><CardTitle>{tab === "appointments" ? "Agendamentos" : "Registos de pagamento"}</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b text-muted-foreground"><th className="p-3">Referência</th><th className="p-3">Email</th><th className="p-3">Estado</th><th className="p-3">Criado em</th><th className="p-3">Dados</th></tr></thead><tbody>{rows.map(row => <tr key={row.id} className="border-b last:border-0"><td className="p-3 font-medium">{String(row.referencia ?? "—")}</td><td className="p-3">{String(row.email ?? row.email_faturacao ?? "—")}</td><td className="p-3">{String(row.estado ?? "—")}</td><td className="p-3">{row.criado_em ? new Date(row.criado_em).toLocaleString("pt-PT") : "—"}</td><td className="max-w-sm truncate p-3 font-mono text-xs">{JSON.stringify(row)}</td></tr>)}</tbody></table>{rows.length === 0 && <p className="p-8 text-center text-muted-foreground">Nenhum registo encontrado.</p>}</div></CardContent></Card></div></main>
}
