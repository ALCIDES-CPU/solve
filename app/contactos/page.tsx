import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Cores atualizadas para o padrão roxo/beringela da AIMA
const contactInfo = [
  {
    icon: Phone,
    title: "Centro de Contacto",
    details: ["+351 217 115 000", "Disponível das 08:00 às 20:00"],
    color: "bg-[#6B3082]", // Roxo vibrante
  },
  {
    icon: Mail,
    title: "E-mail Geral",
    details: ["info@aimagovpt.com", "Para questões e informações gerais"],
    color: "bg-[#4D1E5E]", // Roxo escuro
  },
  {
    icon: Globe,
    title: "Portal AIMA",
    details: ["aimagovpt.com", "Agendamentos e serviços online"],
    color: "bg-[#311041]", // Beringela profundo
  },
  {
    icon: Clock,
    title: "Horário Geral",
    details: ["Dias úteis: 09:00 - 16:30", "Agendamento prévio obrigatório"],
    color: "bg-[#6B3082]",
  },
]

const offices = [
  {
    city: "Lisboa (Sede)",
    address: "Avenida Casal Ribeiro, 18",
    postalCode: "1000-092 Lisboa",
    phone: "+351 217 115 000",
  },
  {
    city: "Porto",
    address: "Avenida de França, 316",
    postalCode: "4050-279 Porto",
    phone: "+351 217 115 000",
  },
  {
    city: "Coimbra",
    address: "Rua do Brasil, 436",
    postalCode: "3030-175 Coimbra",
    phone: "+351 217 115 000",
  },
  {
    city: "Faro",
    address: "Loja do Cidadão - Mercado Municipal",
    postalCode: "8000-151 Faro",
    phone: "+351 217 115 000",
  },
]

export default function ContactosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>
        {/* Hero Section com Gradiente Roxo */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-[#311041] via-[#4D1E5E] to-[#6B3082] relative overflow-hidden">
          {/* Círculo decorativo adaptado */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold text-purple-300 uppercase tracking-widest mb-3">
                Fale Connosco
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Contactos
              </h1>
              <p className="text-base text-white/80 leading-relaxed">
                Entre em contacto connosco através dos seguintes canais. Estamos disponíveis para ajudar com as suas questões.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="py-16 lg:py-20 bg-[#F8F5F9]"> {/* Fundo levemente arroxeado */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {contactInfo.map((contact, index) => (
                <div key={index} className="bg-white border border-purple-100 rounded-lg p-6 hover:border-[#6B3082] hover:shadow-md transition-all">
                  <div className={`w-11 h-11 ${contact.color} rounded-lg flex items-center justify-center mb-4`}>
                    <contact.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs font-bold text-purple-900/60 uppercase tracking-widest mb-3">
                    {contact.title}
                  </h3>
                  <p className="text-base font-semibold text-[#311041] mb-1">
                    {contact.details[0]}
                  </p>
                  <p className="text-xs text-slate-500">
                    {contact.details[1]}
                  </p>
                </div>
              ))}
            </div>

            {/* Offices Section */}
            <div>
              <h2 className="text-xl font-bold text-[#311041] mb-6">
                Centros de Atendimento
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white border border-purple-100 rounded-lg p-6 hover:border-[#6B3082] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#6B3082]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#311041] mb-1.5">
                          {office.city}
                        </h3>
                        <p className="text-sm text-slate-600 mb-0.5">
                          {office.address}
                        </p>
                        <p className="text-sm text-slate-600 mb-3">
                          {office.postalCode}
                        </p>
                        <p className="text-sm font-semibold text-[#311041]">
                          {office.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notice com gradiente escuro */}
            <div className="mt-14 bg-gradient-to-br from-[#311041] to-[#4D1E5E] rounded-xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="w-12 h-12 bg-[#6B3082] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1.5">
                    Informação Importante
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Para atendimento presencial, é obrigatório agendamento prévio através desta plataforma. Chegue com 15 minutos de antecedência e traga todos os documentos originais.
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-[#6B3082] text-white hover:bg-[#5a286e] rounded px-6 h-11 text-sm font-bold shadow-sm transition-colors flex-shrink-0"
                >
                  <Link href="/agendar" className="flex items-center gap-2">
                    Agendar
                    <ArrowRight className="w-4 h-4" />
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
