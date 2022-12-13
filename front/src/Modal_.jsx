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
import axios from "axios";

const Modal_ = (props) => {
  const { open, close, email, nickname, token, storeId } = props;
  let navigate = useNavigate();

  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState();
  useEffect(() => {
    sendReview();
  }, [clicked]);
  const [TF, setTF] = useState(false);

  const sendReview = () => {
    setScore(clicked.filter(Boolean).length * 20);
  };

  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setTF(true);
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
  const [tagId, setTagId] = useState(2);

  const [inputContent, setInputContent] = useState("");
  return (
    <div className={open ? styles.OpenModal : styles.Modal}>
      <section className={styles.ContainerSmall}>
        <div className={styles.TitleWrap}>
          <span className={styles.Title}>리뷰를 등록해주세요</span>
          <button
            className={styles.CloseX}
            onClick={() => {
              close();
              BtnOnOff(-1);
              handleStarClick(-1);
              setInputContent("");
            }}
          >
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
                    setTagId(7);
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
                    setTagId(6);
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
                    setTagId(3);
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
                    setTagId(2);
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
                    setTagId(4);
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
                    setTagId(5);
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
              value={inputContent}
              maxlength="76"
              onChange={(e) => {
                setReview(e.target.value);
                setInputContent(e.target.value);
              }}
            />
          </InputGroup>
          {console.log(btnTF_copy)}
          {btnTF_copy.includes(true) &&
          clicked.includes(true) &&
          inputContent.length > 0 ? (
            <Button
              className={styles.ResBtn}
              onClick={() => {
                axios
                  .post(
                    "http://52.44.107.157:8080/api/review/create",
                    {
                      storeId: storeId,
                      contents: inputContent,
                      grade: score,
                      tagId: tagId,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then((res) => {
                    console.log(res);

                    navigate("/Restaurant", {
                      state: {
                        email: email,
                        nickname: nickname,
                        token: token,
                        storeId: storeId,
                      },
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                setInputContent("");
                BtnOnOff(-1);
                handleStarClick(-1);

                close();
              }}
            >
              등록하기
            </Button>
          ) : (
            <Button
              className={styles.ResBtn}
              style={{ backgroundColor: "#06A77D", color: "white" }}
              disabled
            >
              등록하기
            </Button>
          )}
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
