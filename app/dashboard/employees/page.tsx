import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { setTimeout } from 'timers/promises'
import { columns, Employee } from './columns'

const employees: Employee[] = [
  {
    id: 1,
    firstName: "Colin",
    lastName: "Murray",
    teamName: "alpha",
    isTeamLeader: true,
    avatar: "/images/cm.jpg",
  },
  {
    id: 2,
    firstName: "Tom",
    lastName: "Phillips",
    teamName: "alpha",
    isTeamLeader: false,
  },
  {
    id: 3,
    firstName: "Liam",
    lastName: "Fuentes",
    teamName: "alpha",
    isTeamLeader: false,
  },
  {
    id: 4,
    firstName: "Tina",
    lastName: "Fey",
    teamName: "canary",
    isTeamLeader: true,
    avatar: "/images/tf.jpg",
  },
  {
    id: 5,
    firstName: "Katie",
    lastName: "Johnson",
    teamName: "canary",
    isTeamLeader: false,
  },
  {
    id: 6,
    firstName: "Tina",
    lastName: "Jones",
    teamName: "canary",
    isTeamLeader: false,
  },
  {
    id: 7,
    firstName: "Amy",
    lastName: "Adams",
    teamName: "delta",
    isTeamLeader: true,
  },
  {
    id: 8,
    firstName: "Ryan",
    lastName: "Lopez",
    teamName: "delta",
    isTeamLeader: false,
    avatar: "/images/rl.jpg",
  },
  {
    id: 9,
    firstName: "Jenny",
    lastName: "Jones",
    teamName: "delta",
    isTeamLeader: false,
  },
  {
    id: 10,
    firstName: "Eduardo",
    lastName: "Martinez",
    teamName: "canary",
    isTeamLeader: false,
  },
]

export default async function EmployeesPage() {
  await setTimeout(1000)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Employees
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={employees} />
      </CardContent>
    </Card>
  )
}