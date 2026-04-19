import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const login = () => {
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);

        if (data.message === "Login successful") {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/dashboard");
        }
      })
      .catch(() => setMessage("Error connecting backend"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={login}>Login</button>

      <h3>{message}</h3>
    </div>
  );
}

export default Login;