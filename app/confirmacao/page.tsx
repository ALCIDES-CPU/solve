import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CircleCheck as CheckCircle, Calendar, Mail, FileText, Chrome as Home } from "lucide-react"

export default function ConfirmacaoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1" style={{ paddingTop: "108px" }}>
        {/* Hero Section */}
        <section className="bg-[#1A3A4A] py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-bold text-[#009BAE] uppercase tracking-widest mb-3">
              Confirmação
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Agendamento Em Processo</h1>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-[#EEF4F6]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border border-[#D0E4E8] shadow-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-[#1A3A4A]">Agendamento pendente a confirmação de pagamento!</CardTitle>
                <CardDescription className="text-sm">O seu agendamento foi processado com sucesso, estamos aguardando a confirmação do seu pagamento</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="bg-[#EEF4F6] border border-[#D0E4E8] p-5 rounded-lg flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#007A8A] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-0.5 text-sm text-[#1A3A4A]">Detalhes do Agendamento</h3>
                      <p className="text-sm text-[#4A6570] leading-relaxed">
                        O seu agendamento foi registado no sistema AIMA. Por favor, guarde o número de referência para
                        futuras consultas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#007A8A] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-0.5 text-sm text-[#1A3A4A]">Confirmação por E-mail</h3>
                      <p className="text-sm text-[#4A6570] leading-relaxed">
                        Enviamos um e-mail de confirmação com todos os detalhes do seu agendamento e instruções para o dia
                        do atendimento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-[#007A8A] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-0.5 text-sm text-[#1A3A4A]">Documentos Necessários</h3>
                      <p className="text-sm text-[#4A6570] leading-relaxed">
                        Não se esqueça de trazer todos os documentos originais no dia do seu atendimento. Consulte o
                        e-mail para a lista completa.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#D0E4E8] pt-5">
                  <h3 className="font-bold mb-3 text-sm text-[#1A3A4A]">Próximos Passos:</h3>
                  <ul className="flex flex-col gap-2 text-sm text-[#4A6570]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#007A8A] font-bold">1.</span>
                      <span>Verifique o e-mail de confirmação (incluindo a pasta de spam)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#007A8A] font-bold">2.</span>
                      <span>Prepare todos os documentos originais solicitados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#007A8A] font-bold">3.</span>
                      <span>Chegue 15 minutos antes do horário agendado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#007A8A] font-bold">4.</span>
                      <span>Apresente o e-mail de confirmação na receção do centro AIMA</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild className="flex-1 bg-[#007A8A] hover:bg-[#005F6E] text-white rounded font-bold">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Voltar à Página Inicial
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent rounded border-[#007A8A] text-[#007A8A] hover:bg-[#007A8A] hover:text-white font-semibold transition-colors">
                    <Link href="/agendar">Fazer Novo Agendamento</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
