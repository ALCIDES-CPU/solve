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
        <section className="py-16 lg:py-20 bg-[#1A3A4A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#007A8A]/15 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold text-[#009BAE] uppercase tracking-widest mb-3">
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
        <section className="py-16 lg:py-20 bg-[#EEF4F6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#D0E4E8] rounded-lg overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#D0E4E8] last:border-0">
                    <AccordionTrigger className="text-left py-5 px-6 text-sm font-semibold hover:no-underline text-[#1A3A4A] hover:text-[#007A8A] transition-colors hover:bg-[#EEF4F6]">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-4 h-4 text-[#007A8A] flex-shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4A6570] leading-relaxed pb-5 pl-13 px-6 text-sm">
                      <div className="pl-7">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* CTA Section */}
            <div className="mt-12">
              <div className="bg-[#1A3A4A] rounded-xl p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#007A8A]/15 rounded-full blur-3xl" />

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
                      className="bg-[#007A8A] text-white hover:bg-[#005F6E] rounded px-7 h-11 text-sm font-bold shadow-sm transition-colors"
                    >
                      <Link href="/contactos" className="flex items-center gap-2">
                        Ver Contactos
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 rounded px-7 h-11 text-sm font-semibold bg-transparent"
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
