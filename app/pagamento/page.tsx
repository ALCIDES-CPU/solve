"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PaymentForm } from "@/components/payment-form"
import { Loader as Loader2 } from "lucide-react"

function PaymentContent() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>
        {/* Hero Section */}
        <section className="bg-[#1A3A4A] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-bold text-[#009BAE] uppercase tracking-widest mb-3">
              Pagamento
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Pagamento do Agendamento</h1>
            <p className="text-base text-white/65 leading-relaxed max-w-xl mx-auto">
              Finalize o seu agendamento e conclua o pagamento da taxa do serviço.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-[#EEF4F6]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#007A8A]" />
                </div>
              }
            >
              <PaymentForm />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function PagamentoPage() {
  return <PaymentContent />
}
