"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"

const footerLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/faq", label: "FAQ" },
  { href: "/contactos", label: "Contactos" },
  { href: "/agendar", label: "Agendar" },
]

const partners = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/R%20PT-UsUcqcgTWpGh4Iuh8XZV15jxd2SMVO.png",
    alt: "República Portuguesa",
    width: 160,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CPT%202020-iUPMLKqARDRBGg9FoaJRBuVTEXAwP6.png",
    alt: "COMPETE 2020",
    width: 160,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/C%20UE-o96TqErBlA6hJycCPqLKPRkRASwPca.png",
    alt: "União Europeia",
    width: 180,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PT%202020-oaiSRvVwOROeJBbLK7jKQAov01GkNU.png",
    alt: "Portugal 2020",
    width: 240,
  },
]

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#3B1A5A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 lg:py-16 border-b border-white/10">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Logo & description */}
            <div className="lg:col-span-1">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aima_horizontal_cor-dp99dOkFSZoOboT9H50LBTmCxeGkVO.png"
                alt="AIMA"
                className="h-10 w-auto mb-5 brightness-0 invert"
              />
              <p className="text-white/60 leading-relaxed text-sm mb-6 max-w-xs">
                Agência para a Integração, Migrações e Asilo. Disponíveis para esclarecer todas as suas dúvidas sobre o processo de agendamento.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="mailto:info@aimagovpt.com"
                  className="flex items-center gap-3 text-white/70 hover:text-[#C9A0E0] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  info@aimagovpt.com
                </Link>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Phone className="w-4 h-4" />
                  +351 213 585 500
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                  Links Rápidos
                </h3>
                <ul className="space-y-3">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/65 hover:text-[#C9A0E0] transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                  Informações
                </h3>
                <ul className="space-y-4">
                  <li className="text-white/65 text-sm">
                    <span className="block text-white/40 text-xs mb-1">Horário</span>
                    Dias úteis: 09:00 – 16:30
                  </li>
                  <li className="text-white/65 text-sm">
                    <span className="block text-white/40 text-xs mb-1">Sede</span>
                    Lisboa, Portugal
                  </li>
                  <li className="text-white/65 text-sm">
                    <span className="block text-white/40 text-xs mb-1">Centro de Contacto</span>
                    08:00 – 20:00, dias úteis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="py-8 border-b border-white/10">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-6 text-center">
            Apoios e Financiamento
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="bg-white rounded px-3 py-2 hover:shadow-md hover:shadow-purple-900/30 transition-shadow"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={40}
                  className="h-6 lg:h-7 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} AIMA — Agência para a Integração, Migrações e Asilo. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-5">
              <Link href="#" className="text-xs text-white/35 hover:text-white/60 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-xs text-white/35 hover:text-white/60 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
