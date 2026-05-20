export const SERVICE_PRICES = {
  "agendamento-geral": 75.48,
  "renovacao-autorizacao": 75.48,
  "primeira-autorizacao": 75.48,
  "reagrupamento-familiar": 75.48,
  "informacao-consulta": 75.48,
  otros: 75.48,
} as const

export type ServiceType = keyof typeof SERVICE_PRICES

export function getServicePrice(serviceType: ServiceType): number {
  return SERVICE_PRICES[serviceType]
}

export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace(".", ",")} €`
}
