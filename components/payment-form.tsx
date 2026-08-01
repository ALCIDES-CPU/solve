"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader as Loader2, CreditCard, Shield, Euro, CircleAlert as AlertCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getServicePrice, formatPrice, type ServiceType } from "@/lib/service-prices"
import { cn } from "@/lib/utils"

export function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceType = (searchParams.get("service") || "agendamento-geral") as ServiceType
  const paymentAmount = getServicePrice(serviceType)
  const [appointmentData, setAppointmentData] = useState<any>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("appointmentData")
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setAppointmentData(data)
      } catch (error) {
        console.error("Error parsing appointment data:", error)
      }
    }
  }, [])

  const getServiceName = (type: ServiceType): string => {
    const names: Record<ServiceType, string> = {
      "agendamento-geral": "Agendamento Geral AIMA",
      "renovacao-autorizacao": "Renovação de Autorização de Residência",
      "primeira-autorizacao": "Primeira Autorização de Residência",
      "reagrupamento-familiar": "Reagrupamento Familiar",
      "informacao-consulta": "Manifestação de interresse / CPLP",
      otros: "Outros Serviços",
    }
    return names[type] || "Serviço AIMA"
  }

  const handlePayment = () => {
    setIsProcessing(true)
    setPaymentError(null)
    router.push(`/checkout?service=${serviceType}`)
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="border-b border-purple-50 bg-purple-50/30">
          <CardTitle className="flex items-center gap-2 text-[#2D1057]">
            <CreditCard className="w-5 h-5 text-[#5B2C83]" />
            Resumo do Pagamento
          </CardTitle>
          <CardDescription>Valor do agendamento AIMA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Serviço:</span>
              <span className="font-semibold text-[#1a0a36]">{getServiceName(serviceType)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Taxa de processamento:</span>
              <span className="font-medium text-[#1a0a36]">{formatPrice(paymentAmount)}</span>
            </div>
            <div className="border-t border-purple-100 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#2D1057]">Total:</span>
                <span className="text-2xl font-black text-[#5B2C83] flex items-center gap-1">
                  <Euro className="w-5 h-5" />
                  {formatPrice(paymentAmount).replace(" €", "")}
                </span>
              </div>
            </div>
          </div>

          {appointmentData && (
            <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-xl text-sm space-y-1.5">
              <p className="text-[#6B4A80]">
                <span className="font-bold text-[#2D1057]">Nome:</span> {appointmentData.nomeCompleto}
              </p>
              <p className="text-[#6B4A80]">
                <span className="font-bold text-[#2D1057]">Email:</span> {appointmentData.email}
              </p>
              <p className="text-[#6B4A80]">
                <span className="font-bold text-[#2D1057]">Telemóvel:</span> {appointmentData.telefone}
              </p>
            </div>
          )}

          <Alert className="bg-white border-purple-100">
            <Shield className="h-4 w-4 text-[#5B2C83]" />
            <AlertDescription className="text-xs text-slate-500">
              Pagamento com cartão processado de forma segura. Os seus dados estão protegidos com encriptação de ponta a
              ponta.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="border-purple-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-[#1a0a36] text-white">
          <CardTitle className="text-lg">Processar Pagamento</CardTitle>
          <CardDescription className="text-purple-200/70">Clique no botão abaixo para introduzir os dados do seu cartão</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {paymentError && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#5B2C83] mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-[#2D1057] mb-1">Pagamento Seguro com Cartão</h4>
                  <p className="text-xs text-[#6B4A80] leading-relaxed">
                    Será encaminhado para a página de checkout onde poderá introduzir os dados do seu cartão. Após a
                    confirmação, receberá um e-mail com os detalhes do seu agendamento. Se não receber em 24h, contacte{" "}
                    <span className="font-semibold underline">suporte@aimagovpt.com</span>.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handlePayment} 
              disabled={isProcessing} 
              className={cn(
                "w-full rounded-full font-bold text-sm h-12 transition-all shadow-lg",
                "bg-gradient-to-r from-[#5B2C83] to-[#8B3DBA] hover:from-[#4a2270] hover:to-[#7a35a8] text-white shadow-purple-900/20"
              )}
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> A redirecionar...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Continuar para Pagamento
                </>
              )}
            </Button>

            <p className="text-[10px] text-center text-slate-400 px-4">
              Ao clicar em "Pagar", concorda com os termos e condições do serviço de agendamento AIMA.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
