'use client'
import { getCategoryIcon } from '@/utils'
import { PieChart, Pie, Cell, ResponsiveContainer, PieLabel } from 'recharts'

const data = [
  { name: 'Food', value: 400, icon: 'food' },
  { name: 'Services', value: 300, icon: 'shirt' },
  { name: 'Taxes', value: 300, icon: 'store' },
  { name: 'Clothes', value: 200, icon: 'home' },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
//TODO: type this
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  children,
  ...rest
}: any) => {
  
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN) -10
  const y = cy + radius * Math.sin(-midAngle * RADIAN) -10

  const Icon = getCategoryIcon(children)
  
  return (
    <svg x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central' >
      <Icon size={22} color='white' className='relative'/>
    </svg>
  )
}

export const ExpensesChart = () => {
  return (
    <ResponsiveContainer>
      <PieChart width={500} height={500} onMouseEnter={() => {}} id='chart'>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          innerRadius={30}
          fill='#8884d8'
          dataKey='value'>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
              {entry.icon}
            </Cell>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
