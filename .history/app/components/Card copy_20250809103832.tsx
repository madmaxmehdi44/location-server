type Props = {
  title: string;
  value: string | number;
  icon?: string;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}