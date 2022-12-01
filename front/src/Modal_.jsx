import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Modal.module.css";
import { useEffect } from "react";
import Header from "./Header";
import { AiFillStar, AiOutlineStar, AiFillTag } from "react-icons/ai";
import { ImStarFull } from "react-icons/im";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";

const Modal_ = (props) => {
  const { open, close, message } = props;
  let navigate = useNavigate();

  const [starBtn, setStartBtn] = useState(false);

  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState();
  useEffect(() => {
    sendReview();
  }, [clicked]);

  const sendReview = () => {
    setScore(clicked.filter(Boolean).length * 20);
    console.log(score); // 별점하나당 값 = 20
  };

  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const [btnTF, setBtnTF] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  let btnTF_copy = [...btnTF];

  const BtnOnOff = (e) => {
    btnTF_copy.map((as, i) => {
      console.log(btnTF_copy[i]);
      btnTF_copy[i] = false;
      return (btnTF_copy[i] = false);
    });
    btnTF_copy[e] = !btnTF_copy[e];
    setBtnTF(btnTF_copy);
  };

  const [review, setReview] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  let review_ = [...reviewList];
  let date = [...dateList];
  let star_ = [...scoreList];

  const todayTime = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let min = now.getMinutes();

    return (
      todayYear +
      "." +
      todayMonth +
      "." +
      todayDate +
      " " +
      dayOfWeek +
      " " +
      hours +
      "시" +
      min +
      "분"
    );
  };

  return (
    <div className={open ? styles.OpenModal : styles.Modal}>
      <section className={styles.ContainerSmall}>
        <div style={{ textAlign: "right" }}>
          <span className={styles.Title}>리뷰를 등록해주세요</span>
          <button className={styles.CloseX} onClick={close}>
            &times;
          </button>
        </div>
        <div className={styles.Content}>
          <Container>
            <Row>
              <Col>
                <Button
                  variant="outline-primary"
                  className={btnTF_copy[0] ? styles.TagBtnOn : styles.TagBtn}
                  onClick={(e) => {
                    BtnOnOff(0);
                  }}
                >
                  <AiFillTag className={styles.TagReview} />
                  <span className={styles.TagContentReview}>청결한</span>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-primary"
                  className={btnTF_copy[1] ? styles.TagBtnOn : styles.TagBtn}
                  onClick={(e) => {
                    BtnOnOff(1);
                  }}
                >
                  <AiFillTag className={styles.TagReview} />
                  <span className={styles.TagContentReview}>맛있는</span>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-primary"
                  className={btnTF_copy[2] ? styles.TagBtnOn : styles.TagBtn}
                  onClick={(e) => {
                    BtnOnOff(2);
                  }}
                >
                  <AiFillTag className={styles.TagReview} />
                  <span className={styles.TagContentReview}>분위기좋은</span>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-primary"
                  className={btnTF_copy[3] ? styles.TagBtnOn : styles.TagBtn}
                  onClick={(e) => {
                    BtnOnOff(3);
                    console.log(e.target.id);
                  }}
                >
                  <AiFillTag className={styles.TagReview} />
                  <span className={styles.TagContentReview}>혼밥하기좋은</span>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-primary"
                  className={btnTF_copy[4] ? styles.TagBtnOn : styles.TagBtn}
                  onClick={(e) => {
                    BtnOnOff(4);
                  }}
                >
                  <AiFillTag className={styles.TagReview} />
                  <span className={styles.TagContentReview}>가성비좋은</span>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-primary"
                  className={btnTF_copy[5] ? styles.TagBtnOn : styles.TagBtn}
                  onClick={(e) => {
                    BtnOnOff(5);
                  }}
                >
                  <AiFillTag className={styles.TagReview} />
                  <span className={styles.TagContentReview}>모임하기좋은</span>
                </Button>
              </Col>
            </Row>
          </Container>

          <Stars>
            {array.map((el) => (
              <ImStarFull
                key={el}
                onClick={() => handleStarClick(el)}
                className={clicked[el] && "yellow"}
                size="35"
                style={{ marginRight: "2%" }}
              />
            ))}
          </Stars>

          <InputGroup className={styles.ReviewInput}>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              onChange={(e) => setReview(e.target.value)}
            />
          </InputGroup>
          <Button
            className={styles.ResBtn}
            onClick={() => {
              console.log(btnTF.indexOf(true));

              review_.unshift(review);
              date.unshift(todayTime());
              star_.unshift(score);
              setDateList(date);
              setReviewList(review_);
              setScoreList(star_);
              console.log(review_, date);
              navigate("/Restaurant", {
                state: {
                  tag: btnTF.indexOf(true),
                  review: review_,
                  date: date,
                  star: star_,
                },
              });
              close();
            }}
          >
            등록하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Modal_;

const Stars = styled.div`
  padding-top: 3%;
  width: 100%;

  & svg {
    color: gray;
    cursor: pointer;
  }

  .yellow {
    color: #fcc419;
  }
`;
