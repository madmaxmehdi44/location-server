import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import UserTable from '../components/UserTable';
import LocationChart from '../components/LocationChart';
import { fetchLocations, fetchStats, fetchUsers } from '@/lib/client/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, locations: 0 });
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats().then(setStats);
    fetchUsers().then(setUsers);
    fetchLocations().then(data => {
      const grouped = groupByDay(data);
      setChartData(grouped.values)
    });
  }, []);

  function groupByDay(locations: any[]) {
    const map: Record<string, number> = {};
    locations.forEach(loc => {
      const day = new Date(loc.timestamp).toLocaleDateString('fa-IR');
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).map(([day, count]) => ({ day, count }));
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">داشبورد سرور</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="تعداد کاربران" value={stats.users} icon="👥" />
        <StatCard title="موقعیت‌ها" value={stats.locations} icon="📍" />
        <StatCard title="وضعیت WS" value="فعال ✅" icon="🔌" />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">کاربران فعال</h2>
        <UserTable users={users} />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">نمودار موقعیت‌ها</h2>
        <LocationChart data={chartData} />
      </div>
    </div>
  );
}