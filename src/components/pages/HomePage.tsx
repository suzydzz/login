import { useEffect, useState } from "react";
import { UserTable } from "../UserTable";


interface User {
  id: string;
  email: string;
  name: string;
  surName: string;
}

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь должен быть вызов API
    const fetchUsers = async () => {
      try {
        // Имитация загрузки данных
        setTimeout(() => {
          setUsers([
            {
              id: "1",
              email: "user1@example.com",
              name: "John",
              surName: "Doe",
            },
            {
              id: "2",
              email: "user2@example.com",
              name: "Jane",
              surName: "Smith",
            },
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users</h2>
      <UserTable users={users} />
    </div>
  );
};
