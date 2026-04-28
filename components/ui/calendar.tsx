'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  // Definimos o ano corrente ou um específico. 
  // No seu exemplo anterior era 2026, vou manter 2026 para consistência.
  const targetYear = 2026;
  const targetMonth = 5; // Junho é índice 5 (Janeiro é 0)

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // --- CONFIGURAÇÃO DE DATAS SOLICITADA ---
      // 1. Inicia o calendário em Junho
      defaultMonth={new Date(targetYear, targetMonth)}
      
      // 2. Bloqueia todas as datas EXCETO 16 e 25 de Junho
      disabled={(date) => {
        const isJune = date.getMonth() === targetMonth && date.getFullYear() === targetYear;
        const isDay16 = date.getDate() === 16;
        const isDay25 = date.getDate() === 25;
        
        // Desabilita se NÃO for (Junho E (dia 16 OU dia 25))
        return !(isJune && (isDay16 || isDay25));
      }}
      // ---------------------------------------

      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)]',
        className,
      )}
      captionLayout={captionLayout}
      classNames={{
        ...defaultClassNames,
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'hover:bg-purple-50 hover:text-[#5B2C83] text-[#5B2C83]',
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'hover:bg-purple-50 hover:text-[#5B2C83] text-[#5B2C83]',
        ),
        month_caption: 'text-[#1a0a36] font-bold text-sm mb-2',
        caption_label: 'text-[#2D1057] font-semibold',
        weekday: 'text-purple-400/80 font-normal text-[0.8rem]',
        today: 'bg-purple-50 text-[#5B2C83] font-bold rounded-md',
        selected: 'bg-[#5B2C83] text-white hover:bg-[#2D1057]',
        disabled: 'text-slate-200 opacity-40 cursor-not-allowed', // Datas bloqueadas ficam bem claras
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          const Icon = orientation === 'left' ? ChevronLeftIcon : orientation === 'right' ? ChevronRightIcon : ChevronDownIcon;
          return <Icon className={cn('size-4', className)} {...props} />
        },
        DayButton: CalendarDayButton,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={modifiers.disabled}
      data-selected={modifiers.selected}
      className={cn(
        'flex aspect-square size-auto w-full min-w-(--cell-size) transition-all',
        // Estilo Roxo AIMA para o dia disponível/selecionado
        'data-[selected=true]:bg-[#5B2C83] data-[selected=true]:text-white rounded-md',
        // Feedback visual apenas para os dias que NÃO estão desabilitados
        '!disabled:hover:bg-purple-100 !disabled:hover:text-[#5B2C83] !disabled:text-[#2D1057] !disabled:font-bold',
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
