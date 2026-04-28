"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon, Upload, Loader as Loader2 } from "lucide-react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { ServiceType } from "@/lib/service-prices"
import { useRouter } from "next/navigation"

const disableWeekends = (dateToCheck: Date) => {
  // Bloquear fins de semana
  const day = dateToCheck.getDay()
  return day === 0 || day === 6
}

export function AppointmentForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: "",
    dataNascimento: "",
    tipoDocumento: "",
    numeroDocumento: "",
    email: "",
    telefone: "",
    paisNacionalidade: "",

    // Tipo de Serviço
    tipoServico: "" as ServiceType | "",
    outrosDetalhes: "",

    // Localização e Horário
    pais: "",
    centroAtendimento: "",
    horaDesejada: "",

    // Documentos (file names/references)
    documentoIdentificacao: null as File | null,
    vistoAutorizacao: null as File | null,
    outrosDocumentos: null as File | null,
  })

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Apenas o Passo 1 tem campos obrigatórios
    if (step === 1) {
      if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = "Nome completo é obrigatório"
      if (!formData.dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória"
      if (!formData.tipoDocumento) newErrors.tipoDocumento = "Tipo de documento é obrigatório"
      if (!formData.numeroDocumento.trim()) newErrors.numeroDocumento = "Número do documento é obrigatório"
      if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail inválido"
      if (!formData.telefone.trim()) newErrors.telefone = "Telemóvel é obrigatório"
      if (!formData.paisNacionalidade) newErrors.paisNacionalidade = "País de nacionalidade é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Store appointment data in sessionStorage
      const appointmentData = {
        ...formData,
        appointmentDate: date?.toISOString(),
        submittedAt: new Date().toISOString(),
      }

      sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData))

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to payment with service type
      const serviceType = formData.tipoServico || "agendamento-geral"
      router.push(`/pagamento?service=${serviceType}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Erro ao submeter o formulário. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercentage = (step / 4) * 100

const disableDates = (dateToCheck: Date) => {
  // Datas disponíveis: 10, 22 e 24 de junho de 2026
  // Nota: Junho = mês 5 no JavaScript (0 = Janeiro)
  const allowedDates = [
    new Date(2026, 5, 10),
    new Date(2026, 5, 22),
    new Date(2026, 5, 24),
  ]

  // Normalizar data recebida
  const checkDate = new Date(dateToCheck)
  checkDate.setHours(0, 0, 0, 0)

  // Verificar se está na lista de datas permitidas
  const isAllowed = allowedDates.some((allowedDate) => {
    const d = new Date(allowedDate)
    d.setHours(0, 0, 0, 0)
    return d.getTime() === checkDate.getTime()
  })

  // Se não estiver na lista, desabilita
  return !isAllowed
}

// Data inicial para o calendário abrir em junho de 2026
const defaultCalendarMonth = new Date(2026, 5, 1)
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Passo {step} de 4</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step 1: Dados Pessoais */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>Preencha os seus dados pessoais para o agendamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                  placeholder="Seu nome completo"
                  className={errors.nomeCompleto ? "border-destructive" : ""}
                />
                {errors.nomeCompleto && <p className="text-sm text-destructive">{errors.nomeCompleto}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataNascimento">
                  Data de Nascimento <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                  className={errors.dataNascimento ? "border-destructive" : ""}
                />
                {errors.dataNascimento && <p className="text-sm text-destructive">{errors.dataNascimento}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">
                  Tipo de Documento
                </Label>
                <Select
                  value={formData.tipoDocumento}
                  onValueChange={(value) => setFormData({ ...formData, tipoDocumento: value })}
                >
                  <SelectTrigger id="tipoDocumento" className={errors.tipoDocumento ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passaporte">Passaporte</SelectItem>
                    <SelectItem value="cartao-cidadao">Cartão de Cidadão</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipoDocumento && <p className="text-sm text-destructive">{errors.tipoDocumento}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroDocumento">
                  Número do Documento
                </Label>
                <Input
                  id="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                  placeholder="Número do documento"
                  className={errors.numeroDocumento ? "border-destructive" : ""}
                />
                {errors.numeroDocumento && <p className="text-sm text-destructive">{errors.numeroDocumento}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">
                  Telemóvel
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="+351 912 345 678"
                  className={errors.telefone ? "border-destructive" : ""}
                />
                {errors.telefone && <p className="text-sm text-destructive">{errors.telefone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paisNacionalidade">
                País de Nacionalidade
              </Label>
              <Select
                value={formData.paisNacionalidade}
                onValueChange={(value) => setFormData({ ...formData, paisNacionalidade: value })}
              >
                <SelectTrigger id="paisNacionalidade" className={errors.paisNacionalidade ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione a nacionalidade" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="afeganistao">Afeganistão</SelectItem>
                  <SelectItem value="africa-do-sul">África do Sul</SelectItem>
                  <SelectItem value="albania">Albânia</SelectItem>
                  <SelectItem value="alemanha">Alemanha</SelectItem>
                  <SelectItem value="andorra">Andorra</SelectItem>
                  <SelectItem value="angola">Angola</SelectItem>
                  <SelectItem value="antigua-e-barbuda">Antígua e Barbuda</SelectItem>
                  <SelectItem value="arabia-saudita">Arábia Saudita</SelectItem>
                  <SelectItem value="argelia">Argélia</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="armenia">Arménia</SelectItem>
                  <SelectItem value="australia">Austrália</SelectItem>
                  <SelectItem value="austria">Áustria</SelectItem>
                  <SelectItem value="azerbaijao">Azerbaijão</SelectItem>
                  <SelectItem value="bahamas">Bahamas</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="barbados">Barbados</SelectItem>
                  <SelectItem value="bahrein">Barém</SelectItem>
                  <SelectItem value="belarus">Bielorrússia</SelectItem>
                  <SelectItem value="belgica">Bélgica</SelectItem>
                  <SelectItem value="belize">Belize</SelectItem>
                  <SelectItem value="benin">Benim</SelectItem>
                  <SelectItem value="bolivia">Bolívia</SelectItem>
                  <SelectItem value="bosnia-herzegovina">Bósnia e Herzegovina</SelectItem>
                  <SelectItem value="botswana">Botsuana</SelectItem>
                  <SelectItem value="brasil">Brasil</SelectItem>
                  <SelectItem value="brunei">Brunei</SelectItem>
                  <SelectItem value="bulgaria">Bulgária</SelectItem>
                  <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                  <SelectItem value="burundi">Burundi</SelectItem>
                  <SelectItem value="butao">Butão</SelectItem>
                  <SelectItem value="cabo-verde">Cabo Verde</SelectItem>
                  <SelectItem value="camaroes">Camarões</SelectItem>
                  <SelectItem value="camboja">Camboja</SelectItem>
                  <SelectItem value="canada">Canadá</SelectItem>
                  <SelectItem value="catar">Catar</SelectItem>
                  <SelectItem value="cazaquistao">Cazaquistão</SelectItem>
                  <SelectItem value="chade">Chade</SelectItem>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="chipre">Chipre</SelectItem>
                  <SelectItem value="colombia">Colômbia</SelectItem>
                  <SelectItem value="comores">Comores</SelectItem>
                  <SelectItem value="congo">Congo</SelectItem>
                  <SelectItem value="coreia-do-norte">Coreia do Norte</SelectItem>
                  <SelectItem value="coreia-do-sul">Coreia do Sul</SelectItem>
                  <SelectItem value="costa-do-marfim">Costa do Marfim</SelectItem>
                  <SelectItem value="costa-rica">Costa Rica</SelectItem>
                  <SelectItem value="croacia">Croácia</SelectItem>
                  <SelectItem value="cuba">Cuba</SelectItem>
                  <SelectItem value="dinamarca">Dinamarca</SelectItem>
                  <SelectItem value="djibuti">Djibuti</SelectItem>
                  <SelectItem value="dominica">Dominica</SelectItem>
                  <SelectItem value="egito">Egito</SelectItem>
                  <SelectItem value="el-salvador">El Salvador</SelectItem>
                  <SelectItem value="emirados-arabes-unidos">Emirados Árabes Unidos</SelectItem>
                  <SelectItem value="equador">Equador</SelectItem>
                  <SelectItem value="eritreia">Eritreia</SelectItem>
                  <SelectItem value="eslovaquia">Eslováquia</SelectItem>
                  <SelectItem value="eslovenia">Eslovénia</SelectItem>
                  <SelectItem value="espanha">Espanha</SelectItem>
                  <SelectItem value="estonia">Estónia</SelectItem>
                  <SelectItem value="eswatini">Essuatíni</SelectItem>
                  <SelectItem value="etiopia">Etiópia</SelectItem>
                  <SelectItem value="fiji">Fiji</SelectItem>
                  <SelectItem value="filipinas">Filipinas</SelectItem>
                  <SelectItem value="finlandia">Finlândia</SelectItem>
                  <SelectItem value="franca">França</SelectItem>
                  <SelectItem value="gabao">Gabão</SelectItem>
                  <SelectItem value="gambia">Gâmbia</SelectItem>
                  <SelectItem value="gana">Gana</SelectItem>
                  <SelectItem value="georgia">Geórgia</SelectItem>
                  <SelectItem value="granada">Granada</SelectItem>
                  <SelectItem value="grecia">Grécia</SelectItem>
                  <SelectItem value="guatemala">Guatemala</SelectItem>
                  <SelectItem value="guiana">Guiana</SelectItem>
                  <SelectItem value="guine">Guiné</SelectItem>
                  <SelectItem value="guine-bissau">Guiné-Bissau</SelectItem>
                  <SelectItem value="guine-equatorial">Guiné Equatorial</SelectItem>
                  <SelectItem value="haiti">Haiti</SelectItem>
                  <SelectItem value="honduras">Honduras</SelectItem>
                  <SelectItem value="hungria">Hungria</SelectItem>
                  <SelectItem value="iemen">Iêmen</SelectItem>
                  <SelectItem value="ilhas-marshall">Ilhas Marshall</SelectItem>
                  <SelectItem value="ilhas-salomao">Ilhas Salomão</SelectItem>
                  <SelectItem value="india">Índia</SelectItem>
                  <SelectItem value="indonesia">Indonésia</SelectItem>
                  <SelectItem value="irao">Irão</SelectItem>
                  <SelectItem value="iraque">Iraque</SelectItem>
                  <SelectItem value="irlanda">Irlanda</SelectItem>
                  <SelectItem value="islandia">Islândia</SelectItem>
                  <SelectItem value="israel">Israel</SelectItem>
                  <SelectItem value="italia">Itália</SelectItem>
                  <SelectItem value="jamaica">Jamaica</SelectItem>
                  <SelectItem value="japao">Japão</SelectItem>
                  <SelectItem value="jordania">Jordânia</SelectItem>
                  <SelectItem value="kiribati">Kiribati</SelectItem>
                  <SelectItem value="kuwait">Kuwait</SelectItem>
                  <SelectItem value="laos">Laos</SelectItem>
                  <SelectItem value="lesoto">Lesoto</SelectItem>
                  <SelectItem value="letonia">Letónia</SelectItem>
                  <SelectItem value="libano">Líbano</SelectItem>
                  <SelectItem value="liberia">Libéria</SelectItem>
                  <SelectItem value="libia">Líbia</SelectItem>
                  <SelectItem value="liechtenstein">Liechtenstein</SelectItem>
                  <SelectItem value="lituania">Lituânia</SelectItem>
                  <SelectItem value="luxemburgo">Luxemburgo</SelectItem>
                  <SelectItem value="macedonia-do-norte">Macedónia do Norte</SelectItem>
                  <SelectItem value="madagascar">Madagáscar</SelectItem>
                  <SelectItem value="malasia">Malásia</SelectItem>
                  <SelectItem value="malawi">Malawi</SelectItem>
                  <SelectItem value="maldivas">Maldivas</SelectItem>
                  <SelectItem value="mali">Mali</SelectItem>
                  <SelectItem value="malta">Malta</SelectItem>
                  <SelectItem value="marrocos">Marrocos</SelectItem>
                  <SelectItem value="mauricia">Maurícia</SelectItem>
                  <SelectItem value="mauritania">Mauritânia</SelectItem>
                  <SelectItem value="mexico">México</SelectItem>
                  <SelectItem value="micronesia">Micronésia</SelectItem>
                  <SelectItem value="mocambique">Moçambique</SelectItem>
                  <SelectItem value="moldavia">Moldávia</SelectItem>
                  <SelectItem value="monaco">Mónaco</SelectItem>
                  <SelectItem value="mongolia">Mongólia</SelectItem>
                  <SelectItem value="montenegro">Montenegro</SelectItem>
                  <SelectItem value="myanmar">Myanmar</SelectItem>
                  <SelectItem value="namibia">Namíbia</SelectItem>
                  <SelectItem value="nauru">Nauru</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                  <SelectItem value="nicaragua">Nicarágua</SelectItem>
                  <SelectItem value="niger">Níger</SelectItem>
                  <SelectItem value="nigeria">Nigéria</SelectItem>
                  <SelectItem value="noruega">Noruega</SelectItem>
                  <SelectItem value="nova-zelandia">Nova Zelândia</SelectItem>
                  <SelectItem value="oma">Omã</SelectItem>
                  <SelectItem value="paises-baixos">Países Baixos</SelectItem>
                  <SelectItem value="palau">Palau</SelectItem>
                  <SelectItem value="panama">Panamá</SelectItem>
                  <SelectItem value="papua-nova-guine">Papua-Nova Guiné</SelectItem>
                  <SelectItem value="paquistao">Paquistão</SelectItem>
                  <SelectItem value="paraguai">Paraguai</SelectItem>
                  <SelectItem value="peru">Peru</SelectItem>
                  <SelectItem value="polonia">Polónia</SelectItem>
                  <SelectItem value="portugal">Portugal</SelectItem>
                  <SelectItem value="quenia">Quénia</SelectItem>
                  <SelectItem value="quirguistao">Quirguistão</SelectItem>
                  <SelectItem value="reino-unido">Reino Unido</SelectItem>
                  <SelectItem value="republica-centroafricana">República Centro-Africana</SelectItem>
                  <SelectItem value="republica-checa">República Checa</SelectItem>
                  <SelectItem value="republica-democratica-congo">República Democrática do Congo</SelectItem>
                  <SelectItem value="republica-dominicana">República Dominicana</SelectItem>
                  <SelectItem value="romenia">Roménia</SelectItem>
                  <SelectItem value="ruanda">Ruanda</SelectItem>
                  <SelectItem value="russia">Rússia</SelectItem>
                  <SelectItem value="samoa">Samoa</SelectItem>
                  <SelectItem value="santa-lucia">Santa Lúcia</SelectItem>
                  <SelectItem value="sao-cristovao-e-neves">São Cristóvão e Neves</SelectItem>
                  <SelectItem value="sao-marino">São Marino</SelectItem>
                  <SelectItem value="sao-tome-e-principe">São Tomé e Príncipe</SelectItem>
                  <SelectItem value="sao-vicente-e-granadinas">São Vicente e Granadinas</SelectItem>
                  <SelectItem value="senegal">Senegal</SelectItem>
                  <SelectItem value="serra-leoa">Serra Leoa</SelectItem>
                  <SelectItem value="servia">Sérvia</SelectItem>
                  <SelectItem value="seychelles">Seychelles</SelectItem>
                  <SelectItem value="singapura">Singapura</SelectItem>
                  <SelectItem value="siria">Síria</SelectItem>
                  <SelectItem value="somalia">Somália</SelectItem>
                  <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                  <SelectItem value="sudao">Sudão</SelectItem>
                  <SelectItem value="sudao-do-sul">Sudão do Sul</SelectItem>
                  <SelectItem value="suecia">Suécia</SelectItem>
                  <SelectItem value="suica">Suíça</SelectItem>
                  <SelectItem value="suriname">Suriname</SelectItem>
                  <SelectItem value="tailandia">Tailândia</SelectItem>
                  <SelectItem value="taiwan">Taiwan</SelectItem>
                  <SelectItem value="tajiquistao">Tajiquistão</SelectItem>
                  <SelectItem value="tanzania">Tanzânia</SelectItem>
                  <SelectItem value="timor-leste">Timor-Leste</SelectItem>
                  <SelectItem value="togo">Togo</SelectItem>
                  <SelectItem value="tonga">Tonga</SelectItem>
                  <SelectItem value="trinidad-e-tobago">Trinidad e Tobago</SelectItem>
                  <SelectItem value="tunisia">Tunísia</SelectItem>
                  <SelectItem value="turcomenistao">Turquemenistão</SelectItem>
                  <SelectItem value="turquia">Turquia</SelectItem>
                  <SelectItem value="tuvalu">Tuvalu</SelectItem>
                  <SelectItem value="ucrania">Ucrânia</SelectItem>
                  <SelectItem value="uganda">Uganda</SelectItem>
                  <SelectItem value="uruguai">Uruguai</SelectItem>
                  <SelectItem value="uzbequistao">Uzbequistão</SelectItem>
                  <SelectItem value="vanuatu">Vanuatu</SelectItem>
                  <SelectItem value="vaticano">Vaticano</SelectItem>
                  <SelectItem value="venezuela">Venezuela</SelectItem>
                  <SelectItem value="vietname">Vietname</SelectItem>
                  <SelectItem value="zambia">Zâmbia</SelectItem>
                  <SelectItem value="zimbabwe">Zimbabué</SelectItem>
                </SelectContent>
              </Select>
              {errors.paisNacionalidade && <p className="text-sm text-destructive">{errors.paisNacionalidade}</p>}
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={handleNext} className="rounded">
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Tipo de Serviço */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Serviço</CardTitle>
            <CardDescription>Selecione o tipo de atendimento que necessita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tipoServico">
                Serviço Pretendido
              </Label>
              <Select
                value={formData.tipoServico}
                onValueChange={(value) => setFormData({ ...formData, tipoServico: value as ServiceType })}
              >
                <SelectTrigger id="tipoServico" className={errors.tipoServico ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agendamento-geral">Agendamento Geral AIMA</SelectItem>
                  <SelectItem value="renovacao-autorizacao">Renovação de Autorização de Residência</SelectItem>
                  <SelectItem value="primeira-autorizacao">Primeira Autorização de Residência</SelectItem>
                  <SelectItem value="reagrupamento-familiar">Reagrupamento Familiar</SelectItem>
                  <SelectItem value="informacao-consulta">Manifestação de interresse / CPLP</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipoServico && <p className="text-sm text-destructive">{errors.tipoServico}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="outrosDetalhes">Detalhes Adicionais (opcional)</Label>
              <Textarea
                id="outrosDetalhes"
                value={formData.outrosDetalhes}
                onChange={(e) => setFormData({ ...formData, outrosDetalhes: e.target.value })}
                placeholder="Descreva qualquer informação adicional relevante para o seu atendimento"
                rows={4}
              />
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack} className="rounded bg-transparent">
                Voltar
              </Button>
              <Button type="button" onClick={handleNext} className="rounded">
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Localização e Horário */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Localização e Horário</CardTitle>
            <CardDescription>Escolha o local e horário do atendimento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pais">
                País
              </Label>
              <Select value={formData.pais} onValueChange={(value) => setFormData({ ...formData, pais: value })}>
                <SelectTrigger id="pais" className={errors.pais ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portugal">Portugal</SelectItem>
                </SelectContent>
              </Select>
              {errors.pais && <p className="text-sm text-destructive">{errors.pais}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="centroAtendimento">
                Centro de Atendimento
              </Label>
              <Select
                value={formData.centroAtendimento}
                onValueChange={(value) => setFormData({ ...formData, centroAtendimento: value })}
              >
                <SelectTrigger id="centroAtendimento" className={errors.centroAtendimento ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione o centro" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="albufeira">Albufeira — Quinta da Bela Vista, Bloco A10, Loja D</SelectItem>
                  <SelectItem value="alverca">
                    Alverca do Ribatejo — Praceta Estanislau Raimundo Nogueira 1 e 2
                  </SelectItem>
                  <SelectItem value="angra">Angra do Heroísmo (Açores) — Alto das Covas, 12, Sé</SelectItem>
                  <SelectItem value="aveiro">Aveiro (Loja de Cidadão) — Rua Dr. Orlando Oliveira, 41-47</SelectItem>
                  <SelectItem value="beja">Beja — Rua Dom Nuno Álvares Pereira, 053</SelectItem>
                  <SelectItem value="braga">Braga (Loja de Cidadão) — Rua dos Granjinhos, 6</SelectItem>
                  <SelectItem value="braganca">
                    Bragança — Largo S. João, R/C Dto, Edifício do Ex-Governo Civil
                  </SelectItem>
                  <SelectItem value="coimbra">Coimbra (Loja de Cidadão) — Avenida Central 16/20</SelectItem>
                  <SelectItem value="espinho">Espinho — Rua 32, 834</SelectItem>
                  <SelectItem value="evora">Évora — Avenida Lino de Carvalho, 7 e 7A</SelectItem>
                  <SelectItem value="faro">
                    Faro — Mercado Municipal de Faro, Largo Dr. Francisco Sá Carneiro
                  </SelectItem>
                  <SelectItem value="guarda">Guarda — Rua Paiva Couceiro, 22</SelectItem>
                  <SelectItem value="lisboa-i">Lisboa I — Avenida António Augusto de Aguiar, 20</SelectItem>
                  <SelectItem value="lisboa-ii">Lisboa II (Anjos) — Rua Álvaro Coutinho, 14</SelectItem>
                  <SelectItem value="odemira">
                    Odemira — Rua Sousa Prado, Edifício da Caixa Agrícola, 1.º, Sala 2
                  </SelectItem>
                  <SelectItem value="odivelas">Odivelas (Loja de Cidadão) — Centro Comercial Strada Outlet</SelectItem>
                  <SelectItem value="ponta-delgada">Ponta Delgada — Rua Marquês da Praia e Monforte, 10</SelectItem>
                  <SelectItem value="portalegre">Portalegre — Avenida de Santo Antonio, 12</SelectItem>
                  <SelectItem value="portimao">Portimão — Quinta do Morais, Lote 11, Fração A</SelectItem>
                  <SelectItem value="porto">Porto — Avenida de França, 316, Edifício Capitólio, Loja 57</SelectItem>
                  <SelectItem value="porto-santo">Porto Santo — Avenida Henrique Vieira de Castro, 14</SelectItem>
                  <SelectItem value="santarem">Santarém — Largo do Carmo, Edifício do Governo Civil</SelectItem>
                  <SelectItem value="queluz">Queluz (Loja de Cidadão) — Rua 9 de Abril, 24</SelectItem>
                  <SelectItem value="setubal">Setúbal — Avenida Luísa Todi, 36, 38A e 40</SelectItem>
                  <SelectItem value="tavira">Tavira — Rua Dr. Augusto Carlos Palma, 13</SelectItem>
                  <SelectItem value="viana-castelo">Viana do Castelo — Rua José Espregueira, 145-147</SelectItem>
                  <SelectItem value="viseu">Viseu — Avenida Alberto Sampaio, 17, R/C</SelectItem>
                  <SelectItem value="vila-real">
                    Vila Real — Largo Conde de Amarante, Edifício do Governo Civil
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.centroAtendimento && <p className="text-sm text-destructive">{errors.centroAtendimento}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Data Pretendida
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        errors.date && "border-destructive",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: pt }) : "Escolha uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={disableDates}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaDesejada">
                  Horário Pretendido
                </Label>
                <Select
                  value={formData.horaDesejada}
                  onValueChange={(value) => setFormData({ ...formData, horaDesejada: value })}
                >
                  <SelectTrigger id="horaDesejada" className={errors.horaDesejada ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
                {errors.horaDesejada && <p className="text-sm text-destructive">{errors.horaDesejada}</p>}
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack} className="rounded bg-transparent">
                Voltar
              </Button>
              <Button type="button" onClick={handleNext} className="rounded">
                Próximo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Upload de Documentos */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Documentos Necessários</CardTitle>
            <CardDescription>Formatos aceites: PDF, JPG, PNG (máximo 5 MB por ficheiro)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documentoIdentificacao">
                Documento de Identificação (frente e verso)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="documentoIdentificacao"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("documentoIdentificacao", e.target.files?.[0] || null)}
                  className={cn("cursor-pointer", errors.documentoIdentificacao && "border-destructive")}
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              {formData.documentoIdentificacao && (
                <p className="text-sm text-muted-foreground">
                  Ficheiro selecionado: {formData.documentoIdentificacao.name}
                </p>
              )}
              {errors.documentoIdentificacao && (
                <p className="text-sm text-destructive">{errors.documentoIdentificacao}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vistoAutorizacao">Visto/Autorização Anterior (opcional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="vistoAutorizacao"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("vistoAutorizacao", e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              {formData.vistoAutorizacao && (
                <p className="text-sm text-muted-foreground">Ficheiro selecionado: {formData.vistoAutorizacao.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="outrosDocumentos">Outros Documentos (opcional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="outrosDocumentos"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("outrosDocumentos", e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              {formData.outrosDocumentos && (
                <p className="text-sm text-muted-foreground">Ficheiro selecionado: {formData.outrosDocumentos.name}</p>
              )}
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Importante:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Todos os documentos devem estar legíveis e completos</li>
                <li>Ficheiros devem ter no máximo 5 MB cada</li>
                <li>Formatos aceites: PDF, JPG, PNG</li>
                <li>Documentos incompletos podem resultar no adiamento do atendimento</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack} className="rounded bg-transparent">
                Voltar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="rounded">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />A processar...
                  </>
                ) : (
                  "Submeter e Prosseguir para Pagamento"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  )
}
