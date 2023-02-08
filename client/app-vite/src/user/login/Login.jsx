import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LOGIN_USER } from "../../graphql/mutation.js";
import ReactLoading from 'react-loading';

const Login = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) return;

    try {
      const { data } = await loginUser({
        variables: { loginInput: { email, password } },
      });
      const { token } = data.loginUser;
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(data));
      if (data) {
        toast.success(`Welcome user, ${data?.loginUser?.email}!`, {
          duration: 3000,
          position: "top-center",
          icon: "👏",
        });
        navigate("/home");
      }
    //   client.resetStore();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return <div>
                <ReactLoading type={"spokes"} color={"black"} height={40} width={40} />
           </div>
  }

  return (
    <>
      <form onSubmit={onSubmit} className="form-div">
        <label style={{ color: "gray" }}>Email </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            margin: 4,
            padding: 8,
            borderRadius: 6,
            border: 0,
            backgroundColor: "#EBF5FB",
          }}
        />
        <label style={{ color: "gray" }}>Password </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            margin: 4,
            padding: 8,
            borderRadius: 6,
            border: 0,
            backgroundColor: "#EBF5FB",
          }}
        />
        <button className="buttonLogin" type="submit">
          Login
        </button>
        <Toaster />
        <div className="divError">{error && <p>{error.message}</p>}</div>
      </form>
    </>
  );
};

export default Login;
