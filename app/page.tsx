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
