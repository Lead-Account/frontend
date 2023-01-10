import React from 'react';
import './chart.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data =[
  { name: "Jan", Total: 1500 },
  { name: "Feb", Total: 3000 },
  { name: "Mar", Total: 2400 },
  { name: "Apr", Total: 1500 },
  { name: "May", Total: 1300 },
  { name: "June", Total: 1600 },
  { name: "July", Total: 1900 },
  { name: "Aug", Total: 1200 },
  { name: "Sep", Total: 1200 },
  { name: "Oct", Total: 2200 },
  { name: "Nov", Total: 3200 },
  { name: "Dec", Total: 500 },
];

function Chart({aspect, title}) {
  return (
    <div className='chart'>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
      <AreaChart width={730} height={250} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke='gray' />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
        <Tooltip />
        <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
      </AreaChart>
    </ResponsiveContainer></div>
  )
}

export default Chart