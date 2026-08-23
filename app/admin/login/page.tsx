"use client"

import { FormEvent, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("")
    const { error } = await createClient().auth.signInWithPassword({ email, password })
    if (error) setError("Não foi possível iniciar sessão. Verifique as credenciais.")
    else window.location.href = "/admin"
    setLoading(false)
  }

  return <main className="min-h-screen bg-background flex items-center justify-center p-6"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm space-y-5"><div><p className="text-sm font-semibold text-primary">Área reservada</p><h1 className="text-3xl font-bold">Acesso administrativo</h1><p className="mt-2 text-muted-foreground">Entre com uma conta autorizada.</p></div><div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="password">Palavra-passe</Label><Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button className="w-full" disabled={loading}>{loading ? "A entrar…" : "Entrar"}</Button></form></main>
}
