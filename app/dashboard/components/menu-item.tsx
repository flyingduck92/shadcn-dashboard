'use client'

import { DrawerContext } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

type MenuItemProps = {
  children: React.ReactNode,
  href: string
}

export default function MenuItem({ children, href }: MenuItemProps) {
  const pathName = usePathname()
  const isActive = pathName === href
  const activePathName = isActive && 'bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground'
  const { onClose } = useContext(DrawerContext)

  return (
    <li>
      <Link
        className={cn(
          'block',
          'hover:bg-white',
          'dark:hover:bg-zinc-700',
          'rounded-md',
          'text-muted-foreground',
          'hover:text-foreground',
          'p-2',
          activePathName
        )}
        href={href}
        onClick={onClose}
      >
        {children}
      </Link>
    </li>
  )
}