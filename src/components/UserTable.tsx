import { Link } from "react-router-dom";
import styles from "./UserTable.module.css";

interface UserTableProps {
  users: {
    id: string;
    email: string;
    name?: string;
    surName?: string;
  }[];
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.surName}</td>
            <td>
              <Link to={`/user/edit/${user.id}`}>Edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
