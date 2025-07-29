export const fetchUsers = async () => {
  const response = await fetch("/api/v1/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const createUser = async (userData: FormData) => {
  const response = await fetch("/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

// Остальные методы API
