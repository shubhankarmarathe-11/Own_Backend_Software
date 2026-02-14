import React, { useEffect, useState } from "react";
import { IsUserLoggedIn } from "../../functions/isLoggedin";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // if (Loading) return <div>wait</div>;
  return <div>HomePage</div>;
};

export default HomePage;
