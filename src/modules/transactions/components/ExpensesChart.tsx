'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, PieLabel } from 'recharts'

const data = [
  { name: 'Food', value: 400 },
  { name: 'Services', value: 300 },
  { name: 'Taxes', value: 300 },
  { name: 'Clothes', value: 200 },
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
  console.log(rest)

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {children}
    </text>
  )
}

export const ExpensesChart = () => {
  return (
    <ResponsiveContainer>
      <PieChart width={400} height={400} onMouseEnter={() => {}} id='chart'>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
              {entry.name}
            </Cell>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
