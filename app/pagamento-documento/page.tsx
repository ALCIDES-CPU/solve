"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { DocumentPaymentForm } from "@/components/document-payment-form"
import { Loader as Loader2 } from "lucide-react"

function DocumentPaymentContent() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>
        {/* Hero */}
        <section className="relative overflow-hidden py-12 md:py-14">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block text-xs font-bold bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent uppercase tracking-widest mb-3">
              Dados do Documento
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Registar Documento</h1>
            <p className="text-base text-white/65 leading-relaxed max-w-xl mx-auto">
              Preencha os dados do seu documento de identificação para concluir o registo.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-gradient-to-b from-purple-50/50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#5B2C83]" />
                </div>
              }
            >
              <DocumentPaymentForm />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function PagamentoDocumentoPage() {
  return <DocumentPaymentContent />
}
