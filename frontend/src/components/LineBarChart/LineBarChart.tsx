import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: {
    price: number,
    fecha: string;
  }[]
}
export const LineBarChart = ({ data }:Props) => {
  return (
    <div style={{width: "100%", height:"400px"}}>
    <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip
            formatter={(value:number) =>
              new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
            }
          />
          <Legend />
          <Area type="monotone" dataKey="price" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="price" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="price" stroke="#ff7300" />
          <Scatter dataKey="price" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
