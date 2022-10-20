import React from "react";
import styles from "./styles/Header.module.css";
import { CgProfile } from "react-icons/cg";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={styles.Container}>
      <Container className={styles.Container}>
        <Row>
          <Col sm className={styles.List}>
            <Link to="/Main" className={styles.Link}>
              로고
            </Link>
          </Col>
          <Col sm className={styles.List}>
            <Link to="/Restaurant" className={styles.Link}>
              음식점 리스트
            </Link>
          </Col>
          <Col sm className={styles.List}>
            <Link to="/Forum" className={styles.Link}>
              게시판
            </Link>
          </Col>
          <Col sm className={styles.List}>
            <Link to="/Mypage" className={styles.Link}>
              <CgProfile className={styles.MyIcon} />
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
