import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function CustomBarChart({ data }) {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case 'Low':
        return '#00BC7D';
      case 'Medium':
        return '#FE9900';
      case 'High':
        return '#FF1F57';
      default:
        return '#00BC7D';
    }
  };
  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="text-sm text-gray-600">
            Count:{' '}
            <span className="text-sm font-medium text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  }
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
          <Tooltip content={CustomTooltip} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey="count"
            name="priority"
            radius={[10, 10, 0, 0]}
            fill="#FF8042"
            activeBar={{ r: 2, fill: 'yellow' }}
          >
            {data?.map((entry, index) => (
              <Cell
                key={index}
                fill={getBarColor(entry)}
                style={{ fill: getBarColor(entry) }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;
