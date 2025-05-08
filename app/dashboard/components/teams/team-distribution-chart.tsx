'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

export default function TeamDistributionChart() {
  const data = [
    {
      name: "Delta",
      value: 55,
      color: "#84cc16",
    },
    {
      name: "Alpha",
      value: 34,
      color: "#3b82f6",
    },
    {
      name: "Canary",
      value: 11,
      color: "#f97316",
    },
  ]

  return <ResponsiveContainer height={150} width='100%' >
    <PieChart>
      <Tooltip
        separator=': '
        labelClassName='font-bold'
        wrapperClassName='dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black !text-sm dark:!bg-black rounded-md dark:!border-border'
      />
      <Pie data={data} dataKey="value" nameKey="name">
        {data.map((item, i) => (
          <Cell key={i} fill={item.color} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

}