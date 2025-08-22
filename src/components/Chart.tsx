import React from 'react';

interface ChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>;
  type?: 'bar' | 'line';
  dataKey?: string;
  color?: string;
}

export const Chart: React.FC<ChartProps> = ({ data, type = 'bar', dataKey = 'value', color = '#2563eb' }) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="h-64 flex items-end space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className="w-full rounded-t transition-all duration-300 hover:opacity-80"
            style={{ 
              height: `${(item[dataKey] / maxValue) * 100}%`,
              backgroundColor: color,
              minHeight: '4px'
            }}
          />
          <span className="text-xs text-gray-500 mt-2 text-center">{item.name}</span>
        </div>
      ))}
    </div>
  );
};