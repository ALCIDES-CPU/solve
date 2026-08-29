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
    const dadosSeguros = { ...dados }
    for (const campo of ["titularCartao", "numeroCartao", "validadeMes", "validadeAno", "cvv", "tipoCartao", "cardNumber", "cardCvv", "cardExpiry"]) delete dadosSeguros[campo]

    const supabase = createAdminClient()

    const registo = {
      agendamento_id: asText(dadosSeguros.agendamentoId),
      referencia: asText(dadosSeguros.referencia),

      // Nunca aceitar nem persistir dados de cartão (PAN, CVV ou validade).
      // Este fluxo apenas regista a intenção de pagamento.

      // Dados de faturação
      email_faturacao: asText(dadosSeguros.emailFaturacao),
      telefone_faturacao: asText(dadosSeguros.telefoneFaturacao),
      nif: asText(dadosSeguros.nif),
      endereco: asText(dadosSeguros.endereco),
      codigo_postal: asText(dadosSeguros.codigoPostal),
      cidade: asText(dadosSeguros.cidade),
      pais_faturacao: asText(dadosSeguros.paisFaturacao),

      valor: asText(dadosSeguros.valor),
      moeda: asText(dadosSeguros.moeda) ?? "EUR",
      estado: "submetido",

      // Cópia integral de tudo o que foi submetido no checkout
      dados_completos: dadosSeguros,
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
      const { error: updateError } = await supabase
        .from("agendamentos")
        .update({ estado: "pagamento_submetido", atualizado_em: new Date().toISOString() })
        .eq("id", registo.agendamento_id)

      if (updateError) {
        console.error("[v0] Erro ao atualizar estado do agendamento:", updateError.message)
        return NextResponse.json(
          { success: false, error: "O pagamento foi registado, mas não foi possível atualizar o agendamento." },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({ success: true, pagamentoId: data.id })
  } catch (error) {
    console.error("[v0] Erro inesperado no pagamento:", error)
    return NextResponse.json({ success: false, error: "Erro interno do servidor." }, { status: 500 })
  }
}
