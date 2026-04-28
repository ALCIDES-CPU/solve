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
    color: "bg-[#007A8A]",
  },
  {
    icon: Mail,
    title: "E-mail Geral",
    details: ["info@aimagovpt.com", "Para questões e informações gerais"],
    color: "bg-[#005F6E]",
  },
  {
    icon: Globe,
    title: "Portal AIMA",
    details: ["aimagovpt.com", "Agendamentos e serviços online"],
    color: "bg-[#1A3A4A]",
  },
  {
    icon: Clock,
    title: "Horário Geral",
    details: ["Dias úteis: 09:00 - 16:30", "Agendamento prévio obrigatório"],
    color: "bg-[#007A8A]",
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
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-[#1A3A4A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#007A8A]/15 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold text-[#009BAE] uppercase tracking-widest mb-3">
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

        {/* Contact Cards */}
        <section className="py-16 lg:py-20 bg-[#EEF4F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {contactInfo.map((contact, index) => (
                <div key={index} className="bg-white border border-[#D0E4E8] rounded-lg p-6 hover:border-[#007A8A] hover:shadow-md transition-all">
                  <div className={`w-11 h-11 ${contact.color} rounded-lg flex items-center justify-center mb-4`}>
                    <contact.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs font-bold text-[#4A6570] uppercase tracking-widest mb-3">
                    {contact.title}
                  </h3>
                  <p className="text-base font-semibold text-[#1A3A4A] mb-1">
                    {contact.details[0]}
                  </p>
                  <p className="text-xs text-[#4A6570]">
                    {contact.details[1]}
                  </p>
                </div>
              ))}
            </div>

            {/* Offices Section */}
            <div>
              <h2 className="text-xl font-bold text-[#1A3A4A] mb-6">
                Centros de Atendimento
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#D0E4E8] rounded-lg p-6 hover:border-[#007A8A] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#EEF4F6] rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#007A8A]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#1A3A4A] mb-1.5">
                          {office.city}
                        </h3>
                        <p className="text-sm text-[#4A6570] mb-0.5">
                          {office.address}
                        </p>
                        <p className="text-sm text-[#4A6570] mb-3">
                          {office.postalCode}
                        </p>
                        <p className="text-sm font-semibold text-[#1A3A4A]">
                          {office.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-14 bg-[#1A3A4A] rounded-xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#007A8A]/15 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="w-12 h-12 bg-[#007A8A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1.5">
                    Informação Importante
                  </h3>
                  <p className="text-white/65 leading-relaxed text-sm">
                    Para atendimento presencial, é obrigatório agendamento prévio através desta plataforma. Chegue com 15 minutos de antecedência e traga todos os documentos originais.
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-[#007A8A] text-white hover:bg-[#005F6E] rounded px-6 h-11 text-sm font-bold shadow-sm transition-colors flex-shrink-0"
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
