"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { format } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger } from './select'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        // caption_label: "text-sm font-medium",
        caption_label: "text-sm font-medium hidden",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer"
        ),
        nav_button_previous: "absolute left-1 curo",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 cursor-pointer"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex",
        ...classNames,
      }}
      components={{
        // CaptionLabel: () => null,
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
        Dropdown: (dropdownProps) => {
          const { currentMonth, goToMonth } = useNavigation()
          const { fromYear, fromMonth, fromDate, toYear, toMonth, toDate } = useDayPicker()
          let selectValues: { value: string, label: string }[] = []

          if (dropdownProps.name === 'months') {
            selectValues = Array.from({ length: 12 }, (_, i) => {
              return {
                value: i.toString(),
                label: format(new Date(new Date().getFullYear(), i, 1), 'MMM')
              }
            })
          } else if (dropdownProps.name === 'years') {
            const earliestYear = fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear()
            const latestYear = toYear || toMonth?.getFullYear() || toDate?.getFullYear()

            if (earliestYear && latestYear) {
              const yearsLength = latestYear - earliestYear + 1
              selectValues = Array.from({ length: yearsLength }, (_, i) => {
                return {
                  value: (earliestYear + i).toString(),
                  label: (earliestYear + i).toString()
                }
              })
            }
          }

          const caption = format(currentMonth, dropdownProps.name === 'months' ? 'MMM' : 'yyyy')

          return (
            <Select onValueChange={(newValue) => {
              if (dropdownProps.name === 'months') {
                const newDate = new Date(currentMonth)
                newDate.setMonth(parseInt(newValue))
                goToMonth(newDate)
              } else if (dropdownProps.name === 'years') {
                const newDate = new Date(currentMonth)
                newDate.setFullYear(parseInt(newValue))
                goToMonth(newDate)
              }
            }}
              value={dropdownProps.value?.toString()}
            >
              <SelectTrigger className='px-2 cursor-pointer'>
                {caption}
              </SelectTrigger>
              <SelectContent>
                {selectValues.map(selectValue => (
                  <SelectItem className='cursor-pointer' key={selectValue.value} value={selectValue.value}>
                    {selectValue.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        },
      }}
      {...props}
    />
  )
}

export { Calendar }
