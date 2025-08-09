// components/ChartComponent.tsx
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ChartComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d')!;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
                datasets: [{
                    label: 'بازدید‌ها',
                    data: [300, 450, 280, 610],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59,130,246,0.2)',
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
            }
        });
    }, [ctx]);

    return <canvas ref={canvasRef} className="w-full h-64" />;
}