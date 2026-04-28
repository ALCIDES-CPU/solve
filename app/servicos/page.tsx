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
    color: "bg-[#007A8A]",
  },
  {
    icon: FileText,
    title: "Renovação de Autorização de Residência",
    description: "Renovação de autorização de residência temporária ou permanente",
    duration: "45–60 min",
    documents: ["Passaporte/CC", "Autorização anterior"],
    color: "bg-[#005F6E]",
  },
  {
    icon: Home,
    title: "Primeira Autorização de Residência",
    description: "Pedido de primeira autorização de residência em Portugal",
    duration: "60–90 min",
    documents: ["Passaporte", "Visto", "Contrato de trabalho/estudos", "Seguro de saúde"],
    color: "bg-[#1A3A4A]",
  },
  {
    icon: Users,
    title: "Reagrupamento Familiar",
    description: "Pedido de reagrupamento familiar para residentes em Portugal",
    duration: "45–60 min",
    documents: ["Documentos de identificação", "Autorização do requerente", "Prova de parentesco"],
    color: "bg-[#007A8A]",
  },
  {
    icon: FileText,
    title: "Manifestação de Interesse / CPLP",
    description: "Esclarecimento de dúvidas sobre processos e serviços AIMA e emissão da CPLP",
    duration: "15–30 min",
    documents: ["Documento de identificação"],
    color: "bg-[#005F6E]",
  },
]

export default function ServicosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-[#1A3A4A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#007A8A]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/3 rounded-full blur-2xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold text-[#009BAE] uppercase tracking-widest mb-3">
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

        {/* Services List */}
        <section className="py-16 lg:py-20 bg-[#EEF4F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white border border-[#D0E4E8] rounded-lg p-6 lg:p-7 hover:border-[#007A8A] hover:shadow-md transition-all duration-200"
                >
                  <div className="grid lg:grid-cols-12 gap-5 lg:gap-7 items-start">
                    {/* Icon & Title */}
                    <div className="lg:col-span-5 flex items-start gap-4">
                      <div className={`w-11 h-11 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1A3A4A] mb-1.5 group-hover:text-[#007A8A] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#4A6570]">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 text-[#4A6570] lg:justify-center">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.duration}</span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="lg:col-span-5">
                      <p className="text-xs font-bold text-[#4A6570] uppercase tracking-widest mb-2.5">
                        Documentos necessários
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.documents.map((doc, docIndex) => (
                          <span
                            key={docIndex}
                            className="inline-flex items-center gap-1.5 text-xs text-[#1A3A4A] bg-[#EEF4F6] border border-[#D0E4E8] px-3 py-1.5 rounded"
                          >
                            <CheckCircle className="w-3 h-3 text-[#007A8A]" />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-14">
              <div className="bg-[#1A3A4A] rounded-xl p-10 lg:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#007A8A]/15 rounded-full blur-3xl" />

                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      Pronto para agendar?
                    </h3>
                    <p className="text-white/65 leading-relaxed text-sm">
                      Escolha o serviço que necessita e complete o agendamento online de forma rápida e segura.
                    </p>
                  </div>
                  <div className="lg:text-right">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#007A8A] text-white hover:bg-[#005F6E] rounded px-7 h-12 text-sm font-bold shadow-lg transition-colors"
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
