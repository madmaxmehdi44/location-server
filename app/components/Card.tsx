// components/Card.tsx
type Props = {
    title: string;
    value: string | number;
    icon?: string;
  };
  
  export default function Card({ title, value, icon }: Props) {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 flex items-center space-x-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    );
  }