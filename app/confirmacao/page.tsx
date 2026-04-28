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
        {/* Hero Section - Gradiente Roxo AIMA */}
        <section className="relative overflow-hidden py-12 md:py-14">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a36] via-[#2D1057] to-[#5B2C83]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block text-xs font-bold bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent uppercase tracking-widest mb-3">
              Confirmação
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Agendamento Em Processo</h1>
          </div>
        </section>

        {/* Content Section - Fundo Suave */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-purple-50/50 to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-purple-100 shadow-sm overflow-hidden">
              <CardHeader className="text-center pb-4 pt-8">
                <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 border border-green-100">
                  <CheckCircle className="w-9 h-9 text-green-500" />
                </div>
                <CardTitle className="text-xl text-[#1a0a36] font-bold">
                  Agendamento pendente a confirmação de pagamento!
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  O seu agendamento foi processado com sucesso, estamos aguardando a confirmação do seu pagamento através do portal seguro.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-6 pt-2 pb-8">
                {/* Info Box */}
                <div className="bg-purple-50/30 border border-purple-100 p-6 rounded-2xl flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-[#5B2C83] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1 text-sm text-[#2D1057]">Detalhes do Agendamento</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        O seu agendamento foi registado no sistema AIMA. Por favor, guarde o número de referência que receberá por e-mail.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#5B2C83] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1 text-sm text-[#2D1057]">Confirmação por E-mail</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Enviamos um e-mail de confirmação com todos os detalhes e instruções. Verifique a sua caixa de entrada e spam.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FileText className="w-5 h-5 text-[#5B2C83] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1 text-sm text-[#2D1057]">Documentos Necessários</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Não se esqueça de levar todos os originais no dia do atendimento. A falta de documentos pode impossibilitar o processo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="border-t border-purple-100 pt-6 px-2">
                  <h3 className="font-bold mb-4 text-sm text-[#1a0a36] uppercase tracking-wider">Próximos Passos:</h3>
                  <ul className="flex flex-col gap-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-[#5B2C83] rounded-full text-xs font-bold">1</span>
                      <span>Verifique o e-mail de confirmação</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-[#5B2C83] rounded-full text-xs font-bold">2</span>
                      <span>Prepare todos os documentos originais</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-[#5B2C83] rounded-full text-xs font-bold">3</span>
                      <span>Chegue 15 minutos antes do horário</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-purple-100 text-[#5B2C83] rounded-full text-xs font-bold">4</span>
                      <span>Apresente o comprovativo na receção AIMA</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button asChild className="flex-1 bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] hover:opacity-90 text-white rounded-full font-bold h-12 shadow-lg shadow-purple-900/10">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Voltar à Página Inicial
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 rounded-full border-purple-200 text-[#5B2C83] hover:bg-purple-50 font-bold h-12">
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
