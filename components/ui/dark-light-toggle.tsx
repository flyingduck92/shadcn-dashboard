'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { Button } from './button'

type Props = {
  className?: string
}

export function DarkLightToggle({ className }: Props) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild
          className={className}
          onClick={() => {
            setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
          }}
        >
          <Button variant='outline'>
            <SunIcon className='block dark:hidden' />
            <MoonIcon className='hidden dark:block' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className='hidden dark:inline'>
            Enable Light Mode
          </span>
          <span className='inline dark:hidden'>
            Enable Dark Mode
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider >
  )

}