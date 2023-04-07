import React from 'react'
import {Area, AreaChart, CartesianGrid,Tooltip, XAxis, YAxis} from 'recharts'

const data = [
    {
      "name": "Catégorie A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Catégorie B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Catégorie C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Catégorie D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    }
  ]
export default function Chart() {
  return (
    <div>
<AreaChart width={900} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="yellow" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="orange" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="grey" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="black" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="uv" stroke="yellow" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="pv" stroke="grey" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
    </div>
  )
}
