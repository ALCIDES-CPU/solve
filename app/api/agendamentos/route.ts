import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getServicePrice, SERVICE_PRICES, type ServiceType } from "@/lib/service-prices"

/**
 * Converte qualquer valor recebido em texto, preservando-o na
 * íntegra (zeros à esquerda, sinais "+", espaços internos, etc.).
 * Nunca remove dígitos.
 */
function asText(value: unknown): string | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") return value.length > 0 ? value : null
  return String(value)
}

function gerarReferencia(): string {
  const agora = new Date()
  const ano = agora.getFullYear()
  const aleatorio = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0")
  const tempo = agora.getTime().toString().slice(-5)
  return `AIMA-${ano}-${aleatorio}${tempo}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const dados = body?.appointmentData ?? body ?? {}

    const referencia = gerarReferencia()

    const tipoServico = (asText(dados.tipoServico) ?? "agendamento-geral") as ServiceType
    const valorServico =
      tipoServico in SERVICE_PRICES ? getServicePrice(tipoServico) : getServicePrice("agendamento-geral")

    const supabase = createAdminClient()

    const registo = {
      referencia,

      // Passo 1 — Dados pessoais
      nome_completo: asText(dados.nomeCompleto),
      data_nascimento: asText(dados.dataNascimento),
      tipo_documento: asText(dados.tipoDocumento),
      numero_documento: asText(dados.numeroDocumento),
      email: asText(dados.email),
      telefone: asText(dados.telefone),
      pais_nacionalidade: asText(dados.paisNacionalidade),

      // Passo 2 — Tipo de serviço
      tipo_servico: asText(dados.tipoServico),
      outros_detalhes: asText(dados.outrosDetalhes),

      // Passo 3 — Localização e horário
      pais: asText(dados.pais),
      centro_atendimento: asText(dados.centroAtendimento),
      data_pretendida: asText(dados.dataPretendida ?? dados.appointmentDate),
      hora_desejada: asText(dados.horaDesejada),

      // Passo 4 — Documentos anexados
      documento_identificacao_nome: asText(dados.documentoIdentificacaoNome),
      documento_identificacao_tamanho: asText(dados.documentoIdentificacaoTamanho),
      visto_autorizacao_nome: asText(dados.vistoAutorizacaoNome),
      visto_autorizacao_tamanho: asText(dados.vistoAutorizacaoTamanho),
      outros_documentos_nome: asText(dados.outrosDocumentosNome),
      outros_documentos_tamanho: asText(dados.outrosDocumentosTamanho),

      valor_servico: valorServico.toFixed(2),
      moeda: "EUR",
      estado: "pendente_pagamento",

      // Cópia integral e sem perdas de tudo o que foi submetido
      dados_completos: dados,
    }

    const { data, error } = await supabase.from("agendamentos").insert(registo).select("id, referencia").single()

    if (error) {
      console.error("[v0] Erro ao guardar agendamento:", error.message)
      return NextResponse.json(
        { success: false, error: "Não foi possível guardar o agendamento. Por favor, tente novamente." },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      agendamentoId: data.id,
      referencia: data.referencia,
      valorServico: valorServico,
    })
  } catch (error) {
    console.error("[v0] Erro inesperado no agendamento:", error)
    return NextResponse.json({ success: false, error: "Erro interno do servidor." }, { status: 500 })
  }
}
