import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock historical data for portfolio performance
const generateHistoricalData = () => {
  const data = [];
  const startValue = 2500000;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let currentValue = startValue;
  
  for (let i = 0; i < 12; i++) {
    // Add some realistic variation
    const change = (Math.random() - 0.3) * 200000;
    currentValue = Math.max(startValue * 0.8, currentValue + change);
    
    data.push({
      month: months[i],
      value: Math.round(currentValue),
    });
  }
  
  return data;
};

const historicalData = generateHistoricalData();

export const PerformanceChart = () => {
  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return `${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(174, 62%, 35%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(174, 62%, 35%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: 'hsl(220, 10%, 50%)' }}
            axisLine={{ stroke: 'hsl(220, 13%, 91%)' }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={formatValue}
            tick={{ fontSize: 12, fill: 'hsl(220, 10%, 50%)' }}
            axisLine={{ stroke: 'hsl(220, 13%, 91%)' }}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(value: number) => [
              new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XAF',
                minimumFractionDigits: 0,
              }).format(value),
              'Portfolio Value'
            ]}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid hsl(220, 13%, 91%)',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(174, 62%, 35%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
