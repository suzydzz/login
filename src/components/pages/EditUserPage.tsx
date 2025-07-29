
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../UserForm";

export const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Здесь должна быть загрузка данных пользователя по ID
  const userData = {
    id: id,
    email: "user@example.com",
    name: "John",
    surName: "Doe",
    // ... другие поля
  };

  const handleSubmit = async (data: any) => {
    try {
      // Здесь должен быть вызов API для обновления пользователя
      console.log("User updated:", data);
      navigate("/");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <UserForm onSubmit={handleSubmit} user={userData} isEditMode />
    </div>
  );
};
