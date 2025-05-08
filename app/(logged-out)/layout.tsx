import { DarkLightToggle } from '@/components/ui/dark-light-toggle'

type Props = {
  children?: React.ReactNode
}

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      <div className='flex flex-col gap-4 min-h-screen justify-center items-center p-24'>
        {children}
      </div>
      <DarkLightToggle className='fixed top-[calc(50%-12px)] right-0 cursor-pointer' />
    </>
  )
}