import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")
  const { data: isAdmin } = await supabase.rpc("is_admin")
  if (!isAdmin) redirect("/admin/login")
  const [{ data: agendamentos }, { data: pagamentos }] = await Promise.all([
    supabase.from("agendamentos").select("*").order("criado_em", { ascending: false }).limit(200),
    supabase.from("pagamentos").select("*").order("criado_em", { ascending: false }).limit(200),
  ])
  return <AdminDashboard initialAppointments={agendamentos ?? []} initialPayments={pagamentos ?? []} />
}
