import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { message } from "antd";
import api from "../../services/api";
import { UserContext } from "../../App";
import bgImage from "../../images/p2.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      message.error("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/user/login", data);

      if (res.data.success) {
        const user = res.data.user;

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserData(user);

        message.success(res.data.message);

        // 🔥 Role Navigation (case safe)
        const role = user.type?.toLowerCase();

        if (role === "admin") navigate("/adminhome");
        else if (role === "renter") navigate("/renterhome");
        else if (role === "owner") {
          if (user.granted === "ungranted") {
            message.error("Waiting for admin approval");
          } else {
            navigate("/ownerhome");
          }
        } else {
          navigate("/");
        }
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>RentEase</Navbar.Brand>
          <Nav className="ms-auto">
            <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
            <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Background Section */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* Form Box */}
        <Box
          sx={{
            position: "relative",
            p: 4,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 6,
            width: 400,
            textAlign: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", mx: "auto" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>

            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
              <Grid item>
                <Link to="/forgotpassword">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  Create Account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;

