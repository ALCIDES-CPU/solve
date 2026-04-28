"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contactos", label: "Contactos" },
  { href: "/faq", label: "FAQ" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      {/* Government top bar */}
      <div className="bg-[#3B1A5A] py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-xs text-white/60 font-medium tracking-wide">
            Portal Oficial de Agendamento — República Portuguesa
          </span>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-white/80 font-semibold cursor-pointer">PT</span>
            <span className="text-white/30">|</span>
            <span className="text-white/40 hover:text-white/70 cursor-pointer transition-colors">EN</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-[#D8C8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aima_horizontal_cor-dp99dOkFSZoOboT9H50LBTmCxeGkVO.png"
                alt="AIMA — Agência para a Integração, Migrações e Asilo"
                className="h-9 lg:h-11 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[#3B1A5A] hover:text-[#5B2C83] hover:bg-[#F3EEF8] rounded transition-colors text-sm font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center">
              <Button
                asChild
                className="bg-[#5B2C83] text-white hover:bg-[#3B1A5A] rounded px-5 h-10 text-sm font-bold shadow-sm transition-colors"
              >
                <Link href="/agendar" className="flex items-center gap-2">
                  Agendar Atendimento
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded hover:bg-[#F3EEF8] transition-colors text-[#3B1A5A]"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#D8C8E8] shadow-lg">
          <div className="px-4 py-5">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#3B1A5A] hover:text-[#5B2C83] hover:bg-[#F3EEF8] py-3 px-3 rounded border-b border-[#F3EEF8] transition-colors text-base font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-[#5B2C83] text-white hover:bg-[#3B1A5A] rounded h-12 text-base font-bold"
                >
                  <Link
                    href="/agendar"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    Agendar Atendimento
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
