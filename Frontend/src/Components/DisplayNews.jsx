import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GET_FILTERED_NEWS, NEWS_ROUTES, SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Image, Button, ListGroup } from "react-bootstrap";
import News from "./News";

const DisplayNews = ({ user, newsArray, newsCategories }) => {
  const [breaking, setBreaking] = useState(false);
  const [news, setNews] = useState([...newsArray]);

  const [sports, setSports] = useState(
    newsCategories.includes("SPORTS") ? true : false
  );
  const [business, setBusiness] = useState(
    newsCategories.includes("BUSINESS") ? true : false
  );
  const [world, setWorld] = useState(
    newsCategories.includes("WORLD") ? true : false
  );
  const [politics, setPolitics] = useState(
    newsCategories.includes("POLITICS") ? true : false
  );
  const [crime, setCrime] = useState(
    newsCategories.includes("CRIME") ? true : false
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

  const handleBreakingChange = (event) => {
    setBreaking(event.target.checked);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const categories = [];
      if (sports) categories.push("SPORTS");
      if (business) categories.push("BUSINESS");
      if (world) categories.push("WORLD");
      if (crime) categories.push("CRIME");
      if (politics) categories.push("POLITICS");

      console.log(categories, breaking);

      const data = {
        categories,
        breaking,
      };
  
      const result = await axios.post(
        `${SERVER_URL}${NEWS_ROUTES}${GET_FILTERED_NEWS}`,
        data
      );
      if (result) {
        if (result.data.data.news) {
          console.log("Here");
          setNews(result.data.data.news);
        }
      }

      console.log(result);
      console.log(localStorage.getItem("userId"));
    } catch (error) {
      console.log(error);
      alert("No such flight found");
    }
  };

  useEffect(() => {
    setNews(newsArray);
  }, [newsArray]);


  return (
    <div>
      <Form>
        <Row className="mb-3">
          <Col>
            <div class="d-flex justify-content-center">
              <h3>Refine Search</h3>
            </div>
            <br />
            <Row>
              <Form.Group as={Col} controlId="sports">
                <Form.Check
                  type="checkbox"
                  label="Sports"
                  checked={sports}
                  onChange={handleSportsChange}
                />
              </Form.Group>
              {/* </Col> */}
              {/* <Col> */}
              <Form.Group as={Col} controlId="business">
                <Form.Check
                  type="checkbox"
                  label="Business"
                  checked={business}
                  onChange={handleBusinessChange}
                />
              </Form.Group>
              {/* </Col> */}
              {/* <Col> */}
              <Form.Group as={Col} controlId="world">
                <Form.Check
                  type="checkbox"
                  label="World"
                  checked={world}
                  onChange={handleWorldChange}
                />
              </Form.Group>
              {/* </Col> */}
              {/* <Col> */}
              <Form.Group as={Col} controlId="crime">
                <Form.Check
                  type="checkbox"
                  label="Crime"
                  checked={crime}
                  onChange={handleCrimeChange}
                />
              </Form.Group>
              {/* </Col> */}
              {/* <Col> */}
              <Form.Group as={Col} controlId="politics">
                <Form.Check
                  type="checkbox"
                  label="Politics"
                  checked={politics}
                  onChange={handlePoliticsChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="breaking">
                <Form.Check
                  type="checkbox"
                  label="Breaking News"
                  onChange={handleBreakingChange}
                />
              </Form.Group>
             
            </Row>
            <Row>
              <Col>
                <Button
                  variant="primary"
                  onClick={handleSearch}
                  style={{ marginTop: 30 }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <br />
      <hr />
      <br />

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

export default DisplayNews;
