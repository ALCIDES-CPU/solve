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
        <section className="py-12 lg:py-16 bg-[#1A3A4A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#007A8A]/15 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold text-[#009BAE] uppercase tracking-widest mb-3">
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
                  <Shield className="w-4 h-4 text-[#009BAE]" />
                  <span className="text-sm">Dados seguros</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-[#009BAE]" />
                  <span className="text-sm">5 min para completar</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="w-4 h-4 text-[#009BAE]" />
                  <span className="text-sm">Confirmação imediata</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 lg:py-14 bg-[#EEF4F6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AppointmentForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
