import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import EmployeesStats from './components/employees/employees-stats'
import TeamsStats from './components/teams/teams-stats'

export default function DashboardPage() {

  const isActiveTab = ['dark:data-[state=active]:bg-background', 'data-[state=active]:bg-background']

  return (
    <Tabs defaultValue='employees'>
      <TabsList className='mb-4'>
        <TabsTrigger value='employees' className={cn(isActiveTab)}>Employees stats</TabsTrigger>
        <TabsTrigger value='teams' className={cn(isActiveTab)}>Teams stats</TabsTrigger>
      </TabsList>
      <TabsContent value='employees'>
        <EmployeesStats />
      </TabsContent>
      <TabsContent value='teams'>
        <TeamsStats />
      </TabsContent>
    </Tabs>
  )
}