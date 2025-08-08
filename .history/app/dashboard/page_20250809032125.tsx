// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Load chart dynamically (if it's heavy)
const ChartComponent = dynamic(() => import('../../components/ChartComponent'), {
  ssr: false,
});

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // مثال: دریافت آمار از API
    fetch('/api/users/count')
      .then(res => res.json())
      .then(data => setUserCount(data.total));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">داشبورد</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <Card title="تعداد کاربران" value={userCount} icon="👥" /> */}
        <Card title="بازدید امروز" value="1532" icon="📈" />
        <Card title="درآمد ماه" value="$6,423" icon="💰" />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">نمودار فعالیت</h2>
        <ChartComponent />
      </div>
    </div>
  );
}