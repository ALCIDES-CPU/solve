import { NextResponse } from "next/server"

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/fZu00l3QycUYcq04FcenS05"
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { appointmentData } = body

    return NextResponse.json({
      success: true,
      checkoutUrl: STRIPE_CHECKOUT_URL,
      message: "Link de pagamento gerado com sucesso",
    })
  } catch (error) {
    console.error("[v0] Payment processing error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno ao processar pagamento",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
