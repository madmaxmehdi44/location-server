import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type Props = {
  data: { day: string; count: number }[];
};

export default function LocationChart({ data }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current!.getContext('2d')!;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.day),
        datasets: [{
          label: 'موقعیت‌ها',
          data: data.map(d => d.count),
          backgroundColor: '#3b82f6',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        }
      }
    });
  }, [data]);

  return <canvas ref={ref} />;
}