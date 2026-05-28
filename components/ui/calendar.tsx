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

  const targetYear = 2026;
  const targetMonth = 7; // Agosto é índice 7 (Janeiro é 0)

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // Inicia o calendário em Agosto de 2026
      defaultMonth={new Date(targetYear, targetMonth)}

      // Bloqueia todas as datas EXCETO 4 e 5 de Agosto de 2026
      disabled={(date) => {
        const isAugust = date.getMonth() === targetMonth && date.getFullYear() === targetYear;
        const isDay4 = date.getDate() === 4;
        const isDay5 = date.getDate() === 5;

        // Desabilita se NÃO for (Agosto E (dia 4 OU dia 5))
        return !(isAugust && (isDay4 || isDay5));
      }}
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
        disabled: 'text-slate-200 opacity-40 cursor-not-allowed',
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === 'left'
              ? ChevronLeftIcon
              : orientation === 'right'
              ? ChevronRightIcon
              : ChevronDownIcon
          return <Icon className={cn('size-4', className)} {...props} />
        },
        DayButton: CalendarDayButton,
        ...components,
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
        'data-[selected=true]:bg-[#5B2C83] data-[selected=true]:text-white rounded-md',
        '!disabled:hover:bg-purple-100 !disabled:hover:text-[#5B2C83] !disabled:text-[#2D1057] !disabled:font-bold',
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
