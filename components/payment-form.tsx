"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader as Loader2, CreditCard, Shield, Euro, CircleAlert as AlertCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { getServicePrice, formatPrice, type ServiceType } from "@/lib/service-prices"

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
      outros: "Outros Serviços",
    }
    return names[type] || "Serviço AIMA"
  }

  const openCheckoutPopup = (url: string) => {
    const width = 600
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const popup = window.open(
      url,
      "StripeCheckout",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`,
    )

    if (!popup) {
      // Fallback se popup foi bloqueado
      window.location.href = url
      return
    }

    // Verificar quando o popup é fechado
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup)
        // Redirecionar para confirmação após fechar o popup
        router.push("/confirmacao")
      }
    }, 1000)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentError(null)

    try {
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentData: {
            ...appointmentData,
            service: serviceType,
            servicePrice: paymentAmount,
          },
        }),
      })

      const data = await response.json()

      if (response.ok && data.success && data.checkoutUrl) {
        openCheckoutPopup(data.checkoutUrl)
      } else {
        setPaymentError(data.error || "Erro ao processar o pagamento. Por favor, tente novamente.")
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError("Erro de conexão. Por favor, verifique a sua internet e tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Resumo do Pagamento
          </CardTitle>
          <CardDescription>Valor do agendamento AIMA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Serviço:</span>
              <span className="font-medium">{getServiceName(serviceType)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Taxa de processamento:</span>
              <span className="font-medium">{formatPrice(paymentAmount)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary flex items-center gap-1">
                  <Euro className="w-5 h-5" />
                  {formatPrice(paymentAmount).replace(" €", "")}
                </span>
              </div>
            </div>
          </div>

          {appointmentData && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-sm space-y-1">
              <p>
                <span className="font-semibold">Nome:</span> {appointmentData.nomeCompleto}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {appointmentData.email}
              </p>
              <p>
                <span className="font-semibold">Telemóvel:</span> {appointmentData.telefone}
              </p>
            </div>
          )}

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Pagamento processado de forma segura através da plataforma WHOP. Os seus dados estão protegidos com
              encriptação de ponta a ponta.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processar Pagamento</CardTitle>
          <CardDescription>Clique no botão abaixo para finalizar o seu agendamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">Pagamento Seguro via WHOP</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A transação será processada de forma segura. Após a confirmação, receberá um e-mail com os detalhes
                    do seu agendamento, caso nao receber o email em 24h, enviar email para info@aimagovpt.com.
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handlePayment} disabled={isProcessing} className="w-full rounded bg-[#007A8A] hover:bg-[#005F6E] text-white font-bold" size="lg">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />A processar pagamento...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pagar {formatPrice(paymentAmount)}
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Ao clicar em "Pagar", concorda com os termos e condições do serviço de agendamento AIMA.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
