import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: {
    percentage_change: number,
    fecha: string;
  }[]
}

export const SimpleChart = ({data}: Props) => {
  return (
    <div style={{width: "100%", height:"400px"}}>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="percentage_change" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
