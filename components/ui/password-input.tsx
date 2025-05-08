'use client'

import { useState } from 'react'

import { cn } from "@/lib/utils"
import { Input } from './input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
      />
      <span className='absolute top-[5px] right-[10px] cursor-pointer select-none'>
        {showPassword ?
          <EyeIcon onClick={() => setShowPassword(prev => !prev)} /> :
          <EyeOffIcon onClick={() => setShowPassword(prev => !prev)} />
        }
      </span>
    </div>
  )
}

export { PasswordInput }
