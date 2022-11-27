import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  GETUSER,
  GET_FILTERED_NEWS,
  GET_NEWS,
  NEWS_ROUTES,
  SERVER_URL,
  USER_ROUTES,
} from "../config";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import UserProfile from "./UserProfile";
import News from "./News";
import DisplayNews from "./DisplayNews";
// import Bookings from "./Bookings";
import { Container, Button } from "react-bootstrap";
import { browserHistory } from "react-router";
import TopNews from "./TopNews";

const Dashboard = () => {
  const [key, setKey] = useState("displayNews");
  const [user, setUser] = useState({});
  const [newsArray, setNewsArray] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const history = useHistory();

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const result = await axios.post(`${SERVER_URL}${USER_ROUTES}${GETUSER}`, {
        userId,
      });
      console.log(result.data.data);
      if (result.data.data.user) {
        const userData = result.data.data.user;
        setUser(userData);
        const categoryNames = [];
        console.log(userData.categories);
        if (userData.categories.length) {
          for (const category of userData.categories) {
            categoryNames.push(category.name);
          }
          setNewsCategories(categoryNames);
          const newsArrayItems = await axios.post(
            `${SERVER_URL}${NEWS_ROUTES}${GET_FILTERED_NEWS}`,
            { categories: categoryNames }
          );
          console.log(newsArrayItems.data.data.news);
          setNewsArray(newsArrayItems.data.data.news);
        } else {
          const newsArrayItems = await axios.post(
            `${SERVER_URL}${NEWS_ROUTES}${GET_FILTERED_NEWS}`,
            {}
          );
          console.log(newsArrayItems.data.data.news);
          setNewsArray(newsArrayItems.data.data.news);
        }
      } else console.log("did not recieve user data from backend");
    } catch (error) {
      alert("some error occured");
      console.log(error);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId", "");
    localStorage.setItem("auth", false);

    history.replace("/login", "urlhistory");
    // history.push("/login");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container fluid="xl">
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand>Emergency and Breaking News</Navbar.Brand>
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="userProfile" title="User Profile">
          <UserProfile user={user} />
        </Tab>
        <Tab eventKey="displayNews" title="News">
          <DisplayNews
            user={user}
            newsArray={newsArray}
            newsCategories={newsCategories}
          />
        </Tab>
        <Tab eventKey="topNews" title="Top News">
          <TopNews/>
        </Tab>
        {/* {show()} */}
      </Tabs>
    </Container>
  );
};

export default Dashboard;
