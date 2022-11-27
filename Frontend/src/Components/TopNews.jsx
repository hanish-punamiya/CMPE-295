import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GET_TOP_NEWS, NEWS_ROUTES, SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import News from "./News";

const TopNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      //   const userId = localStorage.getItem("userId");
      const result = await axios.get(
        `${SERVER_URL}${NEWS_ROUTES}${GET_TOP_NEWS}`
      );
      console.log(result.data);
      if (result.data.data) {
        setNews(result.data.data.news);
      } else console.log("did not recieve news data from backend");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Col>
          {news.map((newsItem) => (
            <Row style={{ marginBottom: 30 }}>
              <News key={newsItem._id} news={newsItem} />
            </Row>
          ))}
        </Col>
      </Container>
    </div>
  );
};

export default TopNews;
