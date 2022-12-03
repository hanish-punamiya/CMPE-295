import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

const News = ({ news }) => {
  const isBreaking = () => {
    if (news.breaking)
      return (
        <Col style={{ textAlign: "right" }}>
          <Badge bg="danger">Breaking</Badge>{" "}
        </Col>
      );
  };

  const categoryDetails = () => {
    if (news.category)
      return (
        <Card.Header>
          <Row>
            <Col style={{ textAlign: "left" }}>
              <b>{news.category.name}</b>
            </Col>
            {isBreaking()}
          </Row>
        </Card.Header>
      );
    else {
      return (
        <Card.Header>
          <Row>
            <Col style={{ textAlign: "left" }}>
              <b>{"None"}</b>
            </Col>
            {isBreaking()}
          </Row>
        </Card.Header>
      );
    }
  };

  const displayTextDetails = () => {
    if (news.text) {
      return (
        <Card.Body>
          <Card.Text>{news.text}</Card.Text>
        </Card.Body>
      );
    }
  };

  const authorDetails = () => {
    if (news.sourceName && news.sourceUrl)
      return (
        <Card.Body style={{ textAlign: "left" }}>
          <span className="mb-2 text-muted">Author :</span>&nbsp;&nbsp;&nbsp;
          <Card.Link href={news.sourceUrl} target="_blank">
            {news.sourceName}
          </Card.Link>
        </Card.Body>
      );
  };

  const tweetURLDetails = () => {
    if (news.tweetUrl)
      return (
        <Card.Body style={{ textAlign: "left" }}>
          <span className="mb-2 text-muted">Tweet Url :</span>&nbsp;&nbsp;&nbsp;
          <Card.Link href={news.tweetUrl} target="_blank">
            {news.tweetUrl}
          </Card.Link>
        </Card.Body>
      );
  };

  const moreInfo = () => {
    if (news.urls.length) {
      return (
        <Card.Body>
          <hr />
          <Card.Subtitle className="mb-2 text-muted">More Info:</Card.Subtitle>
          <ListGroup className="list-group-flush">
            {news.urls.map((url, index) => (
              <ListGroup.Item>
                <Card.Link href={url}>{url}</Card.Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      );
    }
  };
  const createdAtDetails = () => {
    if (news.createdAt) {
      let date = new Date(news.createdAt);
      date = date.toLocaleString();
      return (
        <Card.Footer style={{ textAlign: "right" }}>
          <small className="text-muted">{date}</small>
        </Card.Footer>
      );
    }
  };

  return (
    <div>
      <Card>
        {categoryDetails()}
        {displayTextDetails()}
        {authorDetails()}
        {tweetURLDetails()}
        {moreInfo()}
        {createdAtDetails()}
      </Card>
    </div>
  );
};

export default News;
