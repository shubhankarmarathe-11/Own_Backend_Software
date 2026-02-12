import axios from "axios";

async function IsUserLoggedIn() {
  try {
    let result = await axios.get("/api/master/istokenvalid", {
      withCredentials: true,
    });

    if (result.status == 201) return true;

    return false;
  } catch (error) {
    return null;
  }
}

export { IsUserLoggedIn };
