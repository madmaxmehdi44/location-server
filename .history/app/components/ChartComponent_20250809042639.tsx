import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';

let chartInstance: Chart | null = null;

export default function ChartComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d')! ;

        // Destroy chart if it already exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        const config: ChartConfiguration = {
            type: ,
            data: {
                labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه'],
                datasets: [
                    {
                        label: 'تعداد بازدید',
                        data: [12, 19, 3, 5],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                ],
            },
        };

        chartInstance = new Chart(ctx, config);

        // Optional: cleanup on unmount
        return () => {
            chartInstance?.destroy();
            chartInstance = null;
        };
    }, []);

    return <canvas ref={canvasRef} />;
}
