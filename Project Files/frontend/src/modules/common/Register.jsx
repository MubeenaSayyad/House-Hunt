import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { message } from "antd";
import api from "../../services/api";
import bgImage from "../../images/p3.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.type) {
      message.error("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/user/register", data);

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed");
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

        {/* Form Card */}
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
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />

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
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />

            {/* Correct Dropdown */}
            <TextField
              select
              fullWidth
              margin="normal"
              label="Select User Type"
              name="type"
              value={data.type}
              onChange={handleChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Renter">Renter</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Register
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link to="/login">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;