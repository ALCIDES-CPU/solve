import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Clock, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const contactInfo = [
  {
    icon: Phone,
    title: "Centro de Contacto",
    details: ["+351 217 115 000", "Disponível das 08:00 às 20:00"],
    color: "bg-[#5B2C83]", // Roxo médio do gradiente
  },
  {
    icon: Mail,
    title: "E-mail Geral",
    details: ["info@aimagovpt.com", "Para questões e informações gerais"],
    color: "bg-[#2D1057]", // Roxo escuro do gradiente
  },
  {
    icon: Globe,
    title: "Portal AIMA",
    details: ["aimagovpt.com", "Agendamentos e serviços online"],
    color: "bg-[#1a0a36]", // Roxo beringela profundo
  },
  {
    icon: Clock,
    title: "Horário Geral",
    details: ["Dias úteis: 09:00 - 16:30", "Agendamento prévio obrigatório"],
    color: "bg-[#5B2C83]",
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
        {/* Hero Section - Usando o gradiente EXATO do FAQ */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold bg-gradient-to-r from-[#C9A0E0] to-[#E8C8FF] bg-clip-text text-transparent uppercase tracking-widest mb-3">
                Fale Connosco
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Contactos
              </h1>
              <p className="text-base text-white/70 leading-relaxed">
                Entre em contacto connosco através dos seguintes canais. Estamos disponíveis para ajudar com as suas questões.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-purple-50/60 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {contactInfo.map((contact, index) => (
                <div key={index} className="bg-white border border-purple-100 rounded-xl p-6 hover:border-[#5B2C83] hover:shadow-md transition-all">
                  <div className={`w-11 h-11 ${contact.color} rounded-lg flex items-center justify-center mb-4`}>
                    <contact.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs font-bold text-[#2D1057]/60 uppercase tracking-widest mb-3">
                    {contact.title}
                  </h3>
                  <p className="text-base font-semibold text-[#1a0a36] mb-1">
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
              <h2 className="text-xl font-bold text-[#1a0a36] mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#5B2C83] rounded-full" />
                Centros de Atendimento
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white border border-purple-100 rounded-xl p-6 hover:border-[#5B2C83] transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                        <MapPin className="w-4 h-4 text-[#5B2C83]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1a0a36] mb-1.5">
                          {office.city}
                        </h3>
                        <p className="text-sm text-slate-600 mb-0.5">
                          {office.address}
                        </p>
                        <p className="text-sm text-slate-600 mb-3">
                          {office.postalCode}
                        </p>
                        <p className="text-sm font-semibold text-[#2D1057]">
                          {office.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner Informativo - Usando o gradiente secundário do FAQ */}
            <div className="mt-14 relative rounded-2xl p-8 lg:p-10 overflow-hidden shadow-xl shadow-purple-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#7B3DB0]" />
              <div className="absolute top-0 right-0 w-56 h-56 bg-purple-400/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
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
                  className="bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] text-white hover:from-[#4a2270] hover:to-[#7a35a8] rounded-full px-8 h-12 text-sm font-bold shadow-lg transition-all flex-shrink-0"
                >
                  <Link href="/agendar" className="flex items-center gap-2">
                    Agendar Agora
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
