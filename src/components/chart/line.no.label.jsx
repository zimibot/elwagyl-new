import { TinyColumn } from '@ant-design/plots';
import { useEffect, useState } from 'react';

const MAX_PING_VALUE = 500;

export const LineNoLabel = ({ ping = [], border = 'border border-primary' }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const chartConfig = {
      autoFit: true,
      height: 50,
      animation: false,
      colorField: 'y',
      columnWidthRatio: 0.7,
      smooth: true,
      yAxis: {
        max: MAX_PING_VALUE,
        min: 0,
      },
      line: {
        style: {
          stroke: '#00D8FF',
        },
      },
    };
    setConfig(chartConfig);

    return () => {
      setConfig(null);
    };
  }, []);

  const chartDataColor = (d) => {
    const pingValue = ping[parseInt(d.x)];
    return pingValue > 100 && pingValue < 200
      ? '#FFBA08'
      : pingValue > 200
      ? '#ED6A5E'
      : '#00D8FF';
  };

  return (
    <div className={`w-full left-0 absolute overflow-hidden bottom-0 ${border}`}>
      {config && <TinyColumn tooltip={false} data={ping} color={chartDataColor} {...config} />}
    </div>
  );
};
