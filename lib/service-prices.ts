export const SERVICE_PRICES = {
  "agendamento-geral": 85.29,
  "renovacao-autorizacao": 85.29,
  "primeira-autorizacao": 85.29,
  "reagrupamento-familiar": 85.29,
  "informacao-consulta": 85.29,
  outros: 85.29,
} as const

export type ServiceType = keyof typeof SERVICE_PRICES

export function getServicePrice(serviceType: ServiceType): number {
  return SERVICE_PRICES[serviceType]
}

export function formatPrice(price: number): string {
  return `${price.toFixed(2).replace(".", ",")} €`
}
