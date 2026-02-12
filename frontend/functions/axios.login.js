import axios from "axios";

async function LoginUser({ email, password }) {
  try {
    let result = await axios.post("/api/master/login", {
      email: email,
      password: password,
    });
    return { result: result.data, error: null };
  } catch (error) {
    return { result: null, error: error.response?.data || error.message };
  }
}

export { LoginUser };
