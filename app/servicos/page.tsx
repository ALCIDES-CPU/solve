import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Users, Chrome as Home, Clock, ArrowRight, CircleCheck as CheckCircle } from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "Agendamento Geral AIMA",
    description: "Marcação de atendimento para serviços gerais da AIMA",
    duration: "30–45 min",
    documents: ["Documento de identificação"],
    color: "bg-[#5B2C83]", // Roxo médio
  },
  {
    icon: FileText,
    title: "Renovação de Autorização de Residência",
    description: "Renovação de autorização de residência temporária ou permanente",
    duration: "45–60 min",
    documents: ["Passaporte/CC", "Autorização anterior"],
    color: "bg-[#2D1057]", // Roxo escuro
  },
  {
    icon: Home,
    title: "Primeira Autorização de Residência",
    description: "Pedido de primeira autorização de residência em Portugal",
    duration: "60–90 min",
    documents: ["Passaporte", "Visto", "Contrato de trabalho/estudos", "Seguro de saúde"],
    color: "bg-[#1a0a36]", // Beringela profundo
  },
  {
    icon: Users,
    title: "Reagrupamento Familiar",
    description: "Pedido de reagrupamento familiar para residentes em Portugal",
    duration: "45–60 min",
    documents: ["Documentos de identificação", "Autorização do requerente", "Prova de parentesco"],
    color: "bg-[#5B2C83]",
  },
  {
    icon: FileText,
    title: "Manifestação de Interesse / CPLP",
    description: "Esclarecimento de dúvidas sobre processos e serviços AIMA e emissão da CPLP",
    duration: "15–30 min",
    documents: ["Documento de identificação"],
    color: "bg-[#2D1057]",
  },
]

export default function ServicosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>
        {/* Hero Section - Gradiente igual ao FAQ */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent uppercase tracking-widest mb-3">
                Serviços Disponíveis
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Tipos de Serviços
              </h1>
              <p className="text-base text-white/70 leading-relaxed">
                Conheça os serviços disponíveis para agendamento online. Cada serviço tem requisitos específicos de documentação.
              </p>
            </div>
          </div>
        </section>

        {/* Services List - Fundo suave arroxeado igual ao FAQ */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-purple-50/60 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white border border-purple-100 rounded-xl p-6 lg:p-7 hover:border-[#5B2C83] hover:shadow-md transition-all duration-200"
                >
                  <div className="grid lg:grid-cols-12 gap-5 lg:gap-7 items-start">
                    {/* Icon & Title */}
                    <div className="lg:col-span-5 flex items-start gap-4">
                      <div className={`w-11 h-11 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-inner`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1a0a36] mb-1.5 group-hover:text-[#5B2C83] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 text-[#6B4A80] lg:justify-center bg-purple-50 py-1.5 px-3 rounded-full w-fit lg:mx-auto">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold uppercase tracking-tight">{service.duration}</span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="lg:col-span-5">
                      <p className="text-[10px] font-bold text-[#2D1057]/40 uppercase tracking-widest mb-2.5">
                        Documentos necessários
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.documents.map((doc, docIndex) => (
                          <span
                            key={docIndex}
                            className="inline-flex items-center gap-1.5 text-xs text-[#2D1057] bg-white border border-purple-100 px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            <CheckCircle className="w-3 h-3 text-[#5B2C83]" />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section - Gradiente escuro igual ao do final do FAQ */}
            <div className="mt-14">
              <div className="relative rounded-2xl p-10 lg:p-14 overflow-hidden shadow-xl shadow-purple-900/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#7B3DB0]" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Pronto para agendar?
                    </h3>
                    <p className="text-white/65 leading-relaxed text-sm">
                      Escolha o serviço que necessita e complete o agendamento online de forma rápida e segura através do nosso portal.
                    </p>
                  </div>
                  <div className="lg:text-right">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] text-white hover:from-[#4a2270] hover:to-[#7a35a8] rounded-full px-8 h-12 text-sm font-bold shadow-lg transition-all"
                    >
                      <Link href="/agendar" className="flex items-center gap-2">
                        Agendar Atendimento
                        <ArrowRight className="w-4 h-4" />
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
