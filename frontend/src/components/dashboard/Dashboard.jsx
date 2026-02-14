import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IsUserLoggedIn } from "../../../functions/isLoggedin";

const Dashboard = () => {
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

  if (Loading) return <>wait</>;

  return (
    <div>
      <>Dashboard</>
    </div>
  );
};

export default Dashboard;
