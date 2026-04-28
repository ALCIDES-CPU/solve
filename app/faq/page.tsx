import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CircleHelp as HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Como posso agendar um atendimento na AIMA?",
    answer:
      'Pode agendar o seu atendimento através desta plataforma online. Clique em "Agendar Atendimento" no menu, preencha o formulário com os seus dados, faça upload dos documentos necessários e proceda ao pagamento. Receberá uma confirmação por e-mail.',
  },
  {
    question: "Que documentos preciso de apresentar?",
    answer:
      "Os documentos necessários variam conforme o tipo de serviço. Geralmente inclui documento de identificação (passaporte ou cartão de cidadão), comprovante de residência (caso tiver), e documentos específicos ao serviço solicitado (visto, autorização anterior, NIF/NISS, etc.). Consulte a página de Serviços para detalhes específicos.",
  },
  {
    question: "Posso cancelar ou reagendar o meu atendimento?",
    answer:
      "Sim, pode cancelar ou reagendar o seu atendimento com pelo menos 48 horas de antecedência. Entre em contacto através do e-mail ou telefone indicado na confirmação do agendamento. Cancelamentos com menos de 48 horas podem não ser reembolsados.",
  },
  {
    question: "Quanto tempo demora o atendimento?",
    answer:
      "A duração do atendimento varia conforme o tipo de serviço, entre 15 e 90 minutos. O tempo estimado para cada serviço está indicado na página de Serviços. Recomendamos que chegue 15 minutos antes do horário marcado.",
  },
  {
    question: "Vou receber uma confirmação do agendamento?",
    answer:
      "Sim, após o pagamento bem-sucedido, receberá um e-mail de confirmação com todos os detalhes do agendamento, incluindo data, hora, local, número de referência e lista de documentos a trazer. Guarde este e-mail e apresente-o no dia do atendimento.",
  },
  {
    question: "O que acontece se chegar atrasado?",
    answer:
      "Se chegar com mais de 15 minutos de atraso, o seu atendimento poderá ser cancelado e terá de fazer novo agendamento. Recomendamos que chegue com 15 minutos de antecedência para evitar problemas.",
  },
  {
    question: "Posso fazer o agendamento para outra pessoa?",
    answer:
      "Pode preencher o formulário com os dados de outra pessoa, mas a pessoa em questão deve estar presente no atendimento com todos os documentos originais. Não são aceites representações sem procuração legal.",
  },
  {
    question: "Os documentos precisam de estar traduzidos?",
    answer:
      "Documentos em línguas que não sejam português ou inglês devem ser acompanhados de tradução certificada. Verifique os requisitos específicos para o seu tipo de serviço na página de Serviços.",
  },
  {
    question: "Como posso acompanhar o status do meu processo?",
    answer:
      "Após o atendimento, receberá informações sobre como acompanhar o status do seu processo. Pode consultar o andamento através do website oficial da AIMA usando o número de processo fornecido.",
  },
  {
    question: "O pagamento é reembolsável?",
    answer:
      "Pagamentos são reembolsáveis apenas em caso de cancelamento com mais de 48 horas de antecedência ou se o serviço não puder ser prestado por motivos imputáveis à AIMA. Contacte o suporte através do email (info@aimagovpt.com) para solicitar reembolso.",
  },
  {
    question: "Preciso de levar os documentos originais?",
    answer:
      "Sim, é obrigatório apresentar todos os documentos originais no dia do atendimento, mesmo que tenha feito upload de cópias digitais durante o agendamento. As cópias digitais são apenas para pré-análise.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>

        {/* Hero Section */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent uppercase tracking-widest mb-3">
                Dúvidas Frequentes
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Perguntas Frequentes
              </h1>
              <p className="text-base text-white/70 leading-relaxed">
                Encontre respostas para as perguntas mais comuns sobre o processo de agendamento AIMA.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-purple-50/60 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-purple-50 last:border-0"
                  >
                    <AccordionTrigger className="text-left py-5 px-6 text-sm font-semibold hover:no-underline text-[#2D1057] hover:text-[#5B2C83] transition-colors hover:bg-purple-50/50">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-4 h-4 text-[#5B2C83] flex-shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6B4A80] leading-relaxed pb-5 px-6 text-sm">
                      <div className="pl-7">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* CTA Section */}
            <div className="mt-12">
              <div className="relative rounded-2xl p-10 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#7B3DB0]" />
                <div className="absolute top-0 right-0 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Não encontrou a resposta?
                  </h3>
                  <p className="text-white/65 mb-7 max-w-md mx-auto text-sm">
                    Entre em contacto connosco através dos nossos canais de apoio. Estamos disponíveis para ajudar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] text-white hover:from-[#4a2270] hover:to-[#7a35a8] rounded-full px-7 h-11 text-sm font-bold shadow-lg shadow-purple-900/30 transition-all"
                    >
                      <Link href="/contactos" className="flex items-center gap-2">
                        Ver Contactos
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-7 h-11 text-sm font-semibold bg-transparent transition-all"
                    >
                      <Link href="/agendar">
                        Fazer Agendamento
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
