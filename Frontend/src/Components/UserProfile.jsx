import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVER_URL, UPDATECATEGORIES, USER_ROUTES } from "../config";
import Form from "react-bootstrap/Form";

const UserProfile = ({ user }) => {
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const categories = [];
  if (user.categories) {
    for (const category of user.categories) {
      categories.push(category.name);
    }
  }
  const [sports, setSports] = useState(
    categories.includes("SPORTS") ? true : false
  );
  const [business, setBusiness] = useState(
    categories.includes("BUSINESS") ? true : false
  );
  const [world, setWorld] = useState(
    categories.includes("WORLD") ? true : false
  );
  const [politics, setPolitics] = useState(
    categories.includes("POLITICS") ? true : false
  );
  const [crime, setCrime] = useState(
    categories.includes("CRIME") ? true : false
  );

  const history = useHistory();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const categories=[]
      if(sports) categories.push("SPORTS");
      if(business) categories.push("BUSINESS");
      if(world) categories.push("WORLD");
      if(crime) categories.push("CRIME");
      if(politics) categories.push("POLITICS");

      const data = {
        userId: localStorage.getItem("userId"),
        categories,
      };
      const result = await axios.post(`${SERVER_URL}${USER_ROUTES}${UPDATECATEGORIES}`, data);
      console.log(result);
      alert("updated Successfully");
      history.push("/dashboard");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.name) setName(user.name);
    if (user.email) setEmail(user.email);
    if(categories.includes("SPORTS")) setSports(true)
    if(categories.includes("BUSINESS")) setBusiness(true)
    if(categories.includes("WORLD")) setWorld(true)
    if(categories.includes("CRIME")) setCrime(true)
    if(categories.includes("POLITICS")) setPolitics(true)
  }, [user]);

  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Row>
              <Col>
                <Form.Label>Name:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Row>
              <Col>
                <Form.Label>Email address:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  readOnly
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Typography component="h3" variant="h5">
            Categories:
          </Typography>
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
          <br />
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default UserProfile;
