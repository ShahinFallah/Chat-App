import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

function useLogin() {
  const { setUserAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const sendLoginForm = async ({ username, password }) => {
    const success = handleInputError(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/auth/login`,
        {
          username,
          password,
        }
      );

      const data = res.data

      if (data.error) throw new Error(data.error);

      localStorage.setItem("chat-user", JSON.stringify(data));
      setUserAuth(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendLoginForm };
}

const handleInputError = (username, password) => {
  if (!username || !password) {
    toast.error("Please fill out all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password too short (min. 6 characters)");
    return false;
  }
  return true;
};

export default useLogin;
