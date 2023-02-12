import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './register.scss';


const Register = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("USER" || "ADMIN");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !email && !password)
      return toast.error("Fill in the fields", {
        duration: 3000,
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      });

    try {
      const { data } = await registerUser({
        variables: {
          registerInput: { username, email, password, avatar },
          role: role,
        },
      });
      if (data) {
        setUsername("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setRole("");

        return toast.success("User created!", {
          duration: 3000,
          position: "top-center",
          icon: "👏",
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      }
      const { token } = data.registerUser;
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(data));
      // navigate("/home");

      // client.resetStore();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="div-register">
      <div>
        <span>You do not have an account ?</span>
        <Button
          sx={{
            borderRadius: 5,
            border: 0,
            color: "black",
            borderBlockColor: "black",
            fontFamily: "monospace",
            padding: 1.2,
          }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          {" "}
          Sign up{" "}
        </Button>

        <Dialog
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
          open={open}
          onClose={handleClose}
        >
          <h1
            style={{
              color: "gray",
              padding: 8,
              fontFamily: "monospace",
            }}
          >
            New User
          </h1>
          <DialogContentText sx={{ padding: 4, fontFamily: "monospace" }}>
            Register to be able to see and buy the products we offer.
          </DialogContentText>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 15,
            }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ color: "gray" }}>Username </label>
              <input
                style={{
                  padding: 8,
                  width: 180,
                  borderRadius: 8,
                  border: 0,
                  backgroundColor: "aliceblue",
                  marginTop: 10,
                }}
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label style={{ color: "gray" }}>Email </label>
              <input
                style={{
                  padding: 8,
                  width: 180,
                  borderRadius: 8,
                  border: 0,
                  backgroundColor: "aliceblue",
                  marginTop: 10,
                }}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label style={{ color: "gray" }}>Password </label>
              <input
                style={{
                  padding: 8,
                  width: 180,
                  borderRadius: 8,
                  border: 0,
                  backgroundColor: "aliceblue",
                  marginTop: 10,
                }}
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label style={{ color: "gray" }}>Avatar </label>
              <input
                style={{
                  padding: 8,
                  width: 180,
                  borderRadius: 8,
                  border: 0,
                  backgroundColor: "aliceblue",
                  marginTop: 10,
                }}
                type="avatar"
                name="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
              <label style={{ color: "gray" }}>Role </label>
              <input
                style={{
                  padding: 8,
                  width: 180,
                  borderRadius: 8,
                  border: 0,
                  backgroundColor: "aliceblue",
                  marginTop: 10,
                }}
                type="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Button
                type="submit"
                style={{ padding: 8, marginTop: 10, borderRadius: 6 }}
              >
                Signup
              </Button>
              <Toaster />
            </div>
            <div className="divError">{error && <p>{error.message}</p>}</div>
          </form>
          <Toaster />
        </Dialog>
      </div>
    </div>
  );
};

export default Register;
