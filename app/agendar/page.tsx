import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AppointmentForm } from "@/components/appointment-form"
import { Shield, Clock, CircleCheck as CheckCircle } from "lucide-react"

export default function AgendarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1" style={{ paddingTop: "108px" }}>

        {/* Hero Section */}
        <section className="py-12 lg:py-16 relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          {/* Orbs decorativos */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent uppercase tracking-widest mb-3">
                Formulário de Agendamento
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Agendar Atendimento
              </h1>
              <p className="text-base text-white/70 leading-relaxed mb-7">
                Preencha o formulário abaixo com os seus dados e documentos necessários para o agendamento.
              </p>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2 text-white/60">
                  <Shield className="w-4 h-4 text-[#C9A0E0]" />
                  <span className="text-sm">Dados seguros</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-[#C9A0E0]" />
                  <span className="text-sm">5 min para completar</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="w-4 h-4 text-[#C9A0E0]" />
                  <span className="text-sm">Confirmação por email</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-10 lg:py-14 bg-gradient-to-b from-purple-50/60 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AppointmentForm />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
