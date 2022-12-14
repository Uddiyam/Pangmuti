import React, { useEffect, useState } from "react";
import styles from "./styles/Header.module.css";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactGA from "react-ga";

export default function Header({ email, nickname, token, Img }) {
  const toggleMenu = () => {
    document.getElementById("sidebar").style.transform = `translatex(23rem)`;
    document.getElementById("background").style.transform = `translatex(100vw)`;
  };

  const [resize, setResize] = useState(window.innerWidth);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    if (true) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className={styles.Container}>
      <Container className={styles.Container}>
        <Row>
          {resize < 700 && (
            <Col sm className={styles.List}>
              <GiHamburgerMenu
                className={styles.Hamburger}
                style={{ color: "white" }}
                onClick={() => toggleMenu()}
              />
            </Col>
          )}
          {resize > 700 && (
            <Col sm className={styles.List}>
              <Link
                to="/Main"
                className={styles.Link}
                state={{
                  email: email,
                  token: token,
                  nickname: nickname,
                  Img: Img,
                }}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "팡뮤티",
                    label: "header",
                  });
                }}
              >
                팡뮤티
              </Link>
            </Col>
          )}
          {resize > 700 && (
            <Col sm className={styles.List}>
              <Link
                to="/RestaurantList"
                className={styles.Link}
                state={{
                  email: email,
                  token: token,
                  nickname: nickname,
                  Img: Img,
                }}
              >
                음식점 리스트
              </Link>
            </Col>
          )}
          {resize > 700 && (
            <Col sm className={styles.List}>
              <Link
                to="/Forum"
                className={styles.Link}
                state={{
                  email: email,
                  token: token,
                  nickname: nickname,
                  Img: Img,
                }}
              >
                게시판
              </Link>
            </Col>
          )}
          {resize > 700 && (
            <Col sm className={styles.List}>
              <Link
                to="/Mypage"
                className={styles.Link}
                state={{
                  email: email,
                  token: token,
                  nickname: nickname,
                  Img: Img,
                }}
              >
                <CgProfile className={styles.MyIcon} />
              </Link>
            </Col>
          )}
          {resize > 700 && (
            <Col sm className={styles.List}>
              <Link to="/" className={styles.Link}>
                로그아웃
              </Link>
            </Col>
          )}
        </Row>
      </Container>
      <>
        <Container className={styles.Container}>
          <div id="sidebar" className={styles.sidebar}>
            <div className="customer_info">
              <Link
                to="/Mypage"
                className={styles.Link}
                state={{
                  email: email,
                  token: token,
                  nickname: nickname,
                  Img: Img,
                }}
              >
                <CgProfile className={styles.MyIcon} />
              </Link>
            </div>
            <ul className="categories">
              <li className="title">메뉴</li>
              <li className="menu-item">
                <Link
                  to="/RestaurantList"
                  className={styles.Link}
                  state={{
                    email: email,
                    token: token,
                    nickname: nickname,
                    Img: Img,
                  }}
                >
                  음식점 리스트
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  to="/Forum"
                  className={styles.Link}
                  state={{
                    email: email,
                    token: token,
                    nickname: nickname,
                    Img: Img,
                  }}
                >
                  게시판
                </Link>
              </li>
              <li className="menu-item">
                <Link
                  to="/"
                  className={styles.Link}
                  state={{
                    email: email,
                    token: token,
                    nickname: nickname,
                    Img: Img,
                  }}
                >
                  로그아웃
                </Link>
              </li>
            </ul>
          </div>
          <div
            id="background"
            className={styles.background}
            onClick={() => {
              document.getElementById(
                "sidebar"
              ).style.transform = `translatex(0)`;
              document.getElementById(
                "background"
              ).style.transform = `translatex(0)`;
            }}
          />
        </Container>
      </>
    </div>
  );
}
