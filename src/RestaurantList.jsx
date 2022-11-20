import React from "react";
import Header from "./Header";
import styles from "./styles/RestaurantList.module.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function RestaurantList() {
  return (
    <>
      <Header />
      <div className={styles.Container}>
        <form className={styles.SearchBox}>
          <input type="search" className={styles.Search}></input>
        </form>
        <Container className={styles.ListForm}>
          <Row>
            <Col>
              <li className={styles.List}>전체</li>
            </Col>
            <Col>
              <li className={styles.List}>일식</li>
            </Col>
            <Col xs={2}>
              <li className={styles.List}>양식/패스트푸드</li>
            </Col>
            <Col>
              <li className={styles.List}>중식/아시안</li>
            </Col>
            <Col>
              <li className={styles.List}>분식</li>
            </Col>
            <Col>
              <li className={styles.List}>술집</li>
            </Col>
            <Col>
              <li className={styles.List}>카페/디저트</li>
            </Col>
            <Col>
              <li className={styles.List}>편의점</li>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
