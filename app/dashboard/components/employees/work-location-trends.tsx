'use client'

import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: "Jan",
    office: 82,
    wfh: 44,
  },
  {
    name: "Feb",
    office: 80,
    wfh: 40,
  },
  {
    name: "Mar",
    office: 83,
    wfh: 42,
  },
  {
    name: "Apr",
    office: 50,
    wfh: 50,
  },
  {
    name: "May",
    office: 40,
    wfh: 60,
  },
  {
    name: "Jun",
    office: 60,
    wfh: 40,
  },
  {
    name: "Jul",
    office: 55,
    wfh: 55,
  },
  {
    name: "Aug",
    office: 49,
    wfh: 61,
  },
  {
    name: "Sep",
    office: 44,
    wfh: 70,
  },
  {
    name: "Oct",
    office: 40,
    wfh: 40,
  },
  {
    name: "Nov",
    office: 50,
    wfh: 50,
  },
  {
    name: "Dec",
    office: 50,
    wfh: 50,
  },
]


export default function WorkLocationTrends() {
  const [activeItem, setActiveItem] = React.useState<Array<string>>([])
  const handleLegendClick = (dataKey: string) => {
    if (activeItem.includes(dataKey)) {
      setActiveItem(activeItem.filter(el => el !== dataKey))
    } else {
      setActiveItem(prev => [...prev, dataKey])
    }
  }

  return <ResponsiveContainer height={350} width="100%">
    <BarChart data={data} className='[&_.recharts-tooltip-cursor]:fill-zinc-100 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800'>
      <XAxis dataKey="name" stroke='#888888' fontSize={12} />
      <YAxis stroke='#888888' fontSize={12} />
      <Tooltip
        separator=': '
        labelClassName='font-bold'
        wrapperClassName='!text-sm dark:!bg-black rounded-md dark:!border-border'
        formatter={(value, name) => {
          if (name === 'wfh') return [value, 'Work from Home']
          else if (name === 'office') return [value, 'Work from Office']
        }}
      />
      <Legend iconType='circle'
        formatter={(value) => {
          if (value === "wfh") {
            return <div className='text-sm'>Work from Home</div>
          } else if (value === "office") {
            return <div className='text-sm'>Work from Office</div>
          }
        }}
        onClick={props => handleLegendClick(props.dataKey as string)}
      />
      <Bar hide={activeItem.includes('office')} dataKey="office" stackId={1} fill='#ec4899' />
      <Bar hide={activeItem.includes('wfh')} dataKey="wfh" stackId={1} fill='#2563eb' radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
}