type Props = {
    users: { id: string; username: string; lastSeen: string }[];
  };
  
  export default function UserTable({ users }: Props) {
    return (
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">نام کاربری</th>
            <th className="text-left p-2">آخرین موقعیت</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.username}</td>
              <td className="p-2">{new Date(u.lastSeen).toLocaleString('fa-IR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }