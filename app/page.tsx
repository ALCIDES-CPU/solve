import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, FileText, CreditCard, ArrowRight, CircleCheck as CheckCircle, Clock, Shield, Users, ChevronRight } from "lucide-react"

const processSteps = [
  {
    icon: Calendar,
    number: "01",
    title: "Escolha o Serviço",
    description: "Selecione o tipo de atendimento que necessita e escolha a data e hora convenientes.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Submeta Documentos",
    description: "Faça upload dos documentos necessários de forma segura através da nossa plataforma.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Confirmação",
    description: "Efetue o pagamento das taxas e receba a confirmação do seu agendamento.",
  },
]

const services = [
  {
    title: "Agendamento Geral",
    description: "Marcação de atendimento para serviços gerais da AIMA.",
    icon: Calendar,
  },
  {
    title: "Renovação de AR",
    description: "Renovação de autorização de residência temporária ou permanente.",
    icon: FileText,
  },
  {
    title: "Primeira AR",
    description: "Pedido de primeira autorização de residência em Portugal.",
    icon: Users,
  },
  {
    title: "Reagrupamento Familiar",
    description: "Pedido de reagrupamento familiar para residentes.",
    icon: Users,
  },
]

const stats = [
  { value: "50k+", label: "Agendamentos realizados" },
  { value: "98%", label: "Satisfação dos utilizadores" },
  { value: "24/7", label: "Disponibilidade online" },
  { value: "5min", label: "Tempo médio de agendamento" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ paddingTop: "108px" }}>
          <div className="absolute inset-0">
            <Image
              src="/images/banner.svg"
              alt="AIMA — Agência para a Integração, Migrações e Asilo"
              fill
              priority
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B1A5A] via-[#3B1A5A]/92 to-[#3B1A5A]/30" />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#5B2C83]/20 border border-[#5B2C83]/40 rounded px-3 py-1.5 mb-6">
                <span className="w-2 h-2 bg-[#9B59C4] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-[#C9A0E0] tracking-wide">
                  Plataforma Oficial de Agendamento
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
                Agende o seu atendimento na{" "}
                <span className="text-[#C9A0E0]">AIMA</span>
              </h1>

              <p className="text-lg lg:text-xl text-white/75 leading-relaxed mb-8 max-w-xl">
                Processo de legalização simplificado. Agende, submeta documentos e acompanhe o seu processo online, sem filas de espera.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#5B2C83] text-white hover:bg-[#3B1A5A] rounded px-7 h-14 text-base font-bold shadow-lg transition-colors"
                >
                  <Link href="/agendar" className="flex items-center gap-2">
                    Agendar Agora
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 rounded px-7 h-14 text-base font-semibold backdrop-blur-sm transition-all bg-transparent"
                >
                  <Link href="/servicos" className="flex items-center gap-2">
                    Ver Serviços
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white/60">
                  <Shield className="w-4 h-4 text-[#C9A0E0]" />
                  <span className="text-sm">Dados encriptados</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-[#C9A0E0]" />
                  <span className="text-sm">Disponível 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="w-4 h-4 text-[#C9A0E0]" />
                  <span className="text-sm">Suporte dedicado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#F3EEF8] border-y border-[#D8C8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-[#5B2C83] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#6B4A80]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="mb-12">
              <span className="inline-block text-sm font-bold text-[#5B2C83] uppercase tracking-widest mb-3">
                Nossos Serviços
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3B1A5A] mb-4">
                Facilitamos o seu processo de legalização
              </h2>
              <p className="text-lg text-[#6B4A80] max-w-2xl">
                A AIMA disponibiliza diversos serviços para apoiar imigrantes no processo de legalização e integração em Portugal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white border border-[#D8C8E8] rounded-lg p-6 hover:border-[#5B2C83] hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 bg-[#F3EEF8] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#5B2C83]/10 transition-colors">
                    <service.icon className="w-5 h-5 text-[#5B2C83]" />
                  </div>
                  <h3 className="text-base font-bold text-[#3B1A5A] mb-2 group-hover:text-[#5B2C83] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6B4A80] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                className="border-[#5B2C83] text-[#5B2C83] hover:bg-[#5B2C83] hover:text-white rounded px-7 h-11 text-sm font-bold transition-colors bg-transparent"
              >
                <Link href="/servicos" className="flex items-center gap-2">
                  Ver Todos os Serviços
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-28 bg-[#3B1A5A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="mb-14">
              <span className="inline-block text-sm font-bold text-[#C9A0E0] uppercase tracking-widest mb-3">
                Como Funciona
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Processo simples em 3 passos
              </h2>
              <p className="text-lg text-white/60 max-w-2xl">
                O nosso sistema de agendamento foi desenhado para ser intuitivo e eficiente.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-7">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-8 h-full hover:bg-white/8 transition-colors">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 bg-[#5B2C83] rounded-lg flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-4xl font-bold text-white/15">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3.5 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-7 h-7 text-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="bg-gradient-to-br from-[#5B2C83] to-[#3B1A5A] rounded-xl p-10 lg:p-14 relative overflow-hidden max-w-4xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Pronto para agendar?
                </h2>
                <p className="text-lg text-white/75 mb-9 max-w-xl">
                  Inicie o seu processo de forma rápida e segura. Estamos aqui para ajudá-lo em cada passo.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#5B2C83] hover:bg-white/90 rounded px-9 h-13 text-base font-bold shadow-lg transition-colors"
                >
                  <Link href="/agendar" className="flex items-center gap-3">
                    Começar Agora
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
