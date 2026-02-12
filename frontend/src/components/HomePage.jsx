import React, { useEffect, useState } from "react";
import { IsUserLoggedIn } from "../../functions/isLoggedin";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const Runfunction = async () => {
      let result = await IsUserLoggedIn();

      if (result == true) {
        setLoading(false);
      } else {
        navigate("/login");
      }
    };

    Runfunction();
  }, []);

  if (Loading) return <div>wait</div>;
  return <div>HomePage</div>;
};

export default HomePage;
