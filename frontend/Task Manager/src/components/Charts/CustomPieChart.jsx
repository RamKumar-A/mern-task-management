import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';
function CustomPieChart({ data, colors }) {
  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          dataKey="count"
          data={data}
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data?.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            );
          })}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
