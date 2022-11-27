import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SERVER_URL, SIGNUP, USER_ROUTES } from "../config";

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [sports, setSports] = useState(false);
  const [business, setBusiness] = useState(false);
  const [world, setWorld] = useState(false);
  const [politics, setPolitics] = useState(false);
  const [crime, setCrime] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      event.preventDefault();

      const name = fName+" "+lName;
      const categories=[]
      if(sports) categories.push("SPORTS");
      if(business) categories.push("BUSINESS");
      if(world) categories.push("WORLD");
      if(crime) categories.push("CRIME");
      if(politics) categories.push("POLITICS");


      const data = {
        name,
        email,
        password,
        categories,
      };
      const result = await axios.post(`${SERVER_URL}${USER_ROUTES}${SIGNUP}`, data);
      console.log(result);
      localStorage.setItem("userId", result.data.data.savedUser._id);
      console.log(localStorage.getItem("passengerId"));
      localStorage.setItem("auth", true);
      history.push("/dashboard");
    } catch (error) {
      alert("email already exists");
    }
  };

  const handleSportsChange = (event) => {
    setSports(event.target.checked);
  };
  const handleBusinessChange = (event) => {
    setBusiness(event.target.checked);
  };
  const handleWorldChange = (event) => {
    setWorld(event.target.checked);
  };
  const handleCrimeChange = (event) => {
    setCrime(event.target.checked);
  };
  const handlePoliticsChange = (event) => {
    setPolitics(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/breaking-news-alert-background-red-theme_1017-14200.jpg?w=1060&t=st=1669589478~exp=1669590078~hmac=f51497e34bb48053c469b8f62d0f418583dfab7db8ffbc854739077307c63d45)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              marginTop: 8,
              marginLeft: 5,
              marginRight: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    sadad
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h3" variant="h5">
                    Please select the categories you are interested in:
                  </Typography>
                </Grid>
              </Grid>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={handleSportsChange}
                      checked={sports}
                    />
                  }
                  label="Sports"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={handleBusinessChange}
                      checked={business}
                    />
                  }
                  label="Business"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={handleWorldChange}
                      checked={world}
                    />
                  }
                  label="World"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={handleCrimeChange}
                      checked={crime}
                    />
                  }
                  label="Crime"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={handlePoliticsChange}
                      checked={politics}
                    />
                  }
                  label="Politics"
                />
              </FormGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
