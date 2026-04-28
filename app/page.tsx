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
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a36] via-[#2D1057]/95 to-[#5B2C83]/40" />
          </div>

          {/* Decorative orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-40 w-48 h-48 bg-violet-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[#C9A0E0] rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-white/90 tracking-wide">
                  Plataforma Oficial de Agendamento
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
                Agende o seu atendimento na{" "}
                <span className="bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent">
                  AIMA
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/75 leading-relaxed mb-8 max-w-xl">
                Processo de legalização simplificado. Agende, submeta documentos e acompanhe o seu processo online, sem filas de espera.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] text-white hover:from-[#4a2270] hover:to-[#7a35a8] rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-purple-900/40 transition-all"
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
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 h-14 text-base font-semibold backdrop-blur-sm transition-all bg-transparent"
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
        <section className="py-12 bg-gradient-to-r from-purple-50 via-white to-violet-50 border-y border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] bg-clip-text text-transparent mb-1">
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
              <span className="inline-block text-sm font-bold bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] bg-clip-text text-transparent uppercase tracking-widest mb-3">
                Nossos Serviços
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2D1057] mb-4">
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
                  className="group relative bg-white border border-purple-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-violet-50/0 group-hover:from-purple-50 group-hover:to-violet-50/60 transition-all duration-300 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#5B2C83] to-[#8B3DBA] rounded-xl flex items-center justify-center mb-4 shadow-md shadow-purple-200">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-[#2D1057] mb-2 group-hover:text-[#5B2C83] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#6B4A80] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#5B2C83] text-[#5B2C83] hover:bg-gradient-to-r hover:from-[#5B2C83] hover:to-[#8B3DBA] hover:text-white hover:border-transparent rounded-full px-7 h-11 text-sm font-bold transition-all bg-transparent"
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
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="mb-14">
              <span className="inline-block text-sm font-bold bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent uppercase tracking-widest mb-3">
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
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5B2C83] to-[#8B3DBA] rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-5xl font-bold text-white/10">
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
            <div className="relative rounded-3xl p-10 lg:p-16 overflow-hidden max-w-4xl">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#3B1A5A] to-[#7B3DB0]" />
              {/* Orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-60 h-60 bg-violet-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-block text-sm font-bold bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent uppercase tracking-widest mb-4">
                  Comece Hoje
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Pronto para agendar?
                </h2>
                <p className="text-lg text-white/70 mb-9 max-w-xl">
                  Inicie o seu processo de forma rápida e segura. Estamos aqui para ajudá-lo em cada passo.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#5B2C83] hover:bg-white/90 rounded-full px-9 h-14 text-base font-bold shadow-xl shadow-purple-900/30 transition-all"
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
