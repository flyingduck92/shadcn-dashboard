import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangleIcon, BadgeCheckIcon, LaptopIcon, PartyPopperIcon, UserCheck2Icon, UserIcon, UserRoundXIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import cm from '@/public/images/cm.jpg'
import WorkLocationTrends from './work-location-trends'

export default function EmployeesStats() {

  const totalEmployees = 100
  const employeesPresent = 80
  const employeesPresentPercentage = (employeesPresent / totalEmployees) * 100

  return (
    <>
      <div className='grid lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader className='-mb-5'>
            <CardTitle className='text-base'>
              Total employees
            </CardTitle>
          </CardHeader>
          <CardContent className='flex justify-between items-center'>
            <div className='flex gap-2'>
              <UserIcon />
              <span className='text-5xl font-bold'>{totalEmployees}</span>
            </div>
            <div>
              <Button asChild size="xs">
                <Link href='/dashboard/employees'>View all</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='-mb-5'>
            <CardTitle className='text-base'>
              Employees present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex gap-2'>
              {employeesPresentPercentage > 75 ? <UserCheck2Icon /> : <UserRoundXIcon />}
              <span className='text-5xl font-bold'>{employeesPresent}</span>
            </div>
          </CardContent>
          <CardFooter>
            {
              employeesPresentPercentage > 75 ?
                <span className='flex items-center text-xs text-green-500 gap-1'>
                  <BadgeCheckIcon />
                  {employeesPresentPercentage}% of employees are present.
                </span>
                :
                <span className='flex items-center text-xs text-red-500 gap-1'>
                  <AlertTriangleIcon />
                  Only {employeesPresentPercentage}% of employees are present.
                </span>
            }
          </CardFooter>
        </Card>
        <Card className='flex flex-col border-pink-500'>
          <CardHeader className='-mb-5'>
            <CardTitle className='text-base'>
              Employee of the month
            </CardTitle>
          </CardHeader>
          <CardContent className='flex gap-2 items-center'>
            <Avatar>
              <Image src={cm} alt='cm' />
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <span className='text-2xl'>Collin Murray</span>
          </CardContent>
          <CardFooter className='flex gap-2 items-center text-xs text-muted-foreground mt-auto'>
            <PartyPopperIcon className='text-pink-500' />
            <span>Congratulation, Collin!</span>
          </CardFooter>
        </Card>
      </div>
      <Card className='my-4'>
        <CardHeader>
          <CardTitle className='text-lg flex gap-2 items-center'>
            <LaptopIcon />
            <span>Employee work location trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='pl-0'>
          <WorkLocationTrends />
        </CardContent>
      </Card>
    </>
  )
}