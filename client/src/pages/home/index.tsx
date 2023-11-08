import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home(): JSX.Element {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("enviroToken");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  return (
    <main>
      <h1>Welcome to your dashboard</h1>
      <div>Here's your latest data</div>
    </main>
  );
}
