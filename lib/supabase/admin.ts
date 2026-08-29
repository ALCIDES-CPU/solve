import "server-only"
import { createClient } from "@supabase/supabase-js"

/**
 * Cliente Supabase com privilégios de servidor (service role).
 * Usado apenas em Route Handlers para inserir dados nas tabelas
 * protegidas por RLS (agendamentos e pagamentos).
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY

  if (!url || !serviceKey) {
    throw new Error("Configuração do Supabase em falta (URL ou SERVICE_ROLE_KEY).")
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
