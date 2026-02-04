import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SaaSHomepage from "./components/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SaaSHomepage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
