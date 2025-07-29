import { useNavigate } from "react-router-dom";
import { UserForm } from "../UserForm";

export const CreateUserPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      // Здесь должен быть вызов API для создания пользователя
      console.log("User created:", data);
      navigate("/");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};
