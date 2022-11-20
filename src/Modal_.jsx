import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Modal.module.css";
import { useEffect } from "react";
import Header from "./Header";
import { AiFillStar, AiOutlineStar, AiFillTag } from "react-icons/ai";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Modal_ = (props) => {
  const { open, close, message, id, modalId, userEmail } = props;
  let navigate = useNavigate();

  const [starBtn, setStartBtn] = useState(false);
  const navermaps = window.naver.maps;
  let position = new navermaps.LatLng(37.6208, 127.0585); // 통신시 변수로 받기
  const AVR_RATE = 80; // 통신시 변수로 받아야 함
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0]; // 임시 리스트.
    let starVerScore = (AVR_RATE * 70) / 100; // 별 한 개 당 width가 14이므로 총 70. 100점 만점인 현재와 비율을 맞춰줌
    let idx = 0;
    while (starVerScore > 14) {
      // 14를 starVerScore에서 하나씩 빼가면서 별 하나하나에 채워질 width를 지정해줍니다. 다 채워지지 않을 인덱스의 별은 아래 tempStarRatesArr[idx] = starVerScore; 에서 채워줍니다.
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr; // 평균이 80이라면 [14, 14, 14, 14, 0] 이 되겠죠?
  };
  useEffect(() => {
    setRatesResArr(calcStarRates); // 별점 리스트는 첫 렌더링 때 한번만 상태를 설정해줍니다.
  }, []);
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

  const [review, setReview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={open ? styles.OpenModal : styles.Modal}>
      <section
        className={modalId == 1 ? styles.Container : styles.ContainerSmall}
      >
        <div style={{ textAlign: "right" }}>
          <button className={styles.CloseX} onClick={close}>
            <span>리뷰를 등록해주세요</span> &times;
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
          <div className={styles.ReviewRate}>
            {STAR_IDX_ARR.map((item, idx) => {
              return (
                <>
                  <span className={styles.Rating} key={`${item}_${idx}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="39"
                      viewBox="0 0 14 13"
                      fill="#CCCCCC"
                    >
                      <clipPath id={`${item}StarClip`}>
                        {/* 새로 생성한 리스트에서 별 길이를 넣어줍니다. */}
                        <rect width={`${ratesResArr[idx]}`} height="39" />
                      </clipPath>
                      <path
                        id={`${item}Star`}
                        d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                        transform="translate(-2 -2)"
                      />
                      <use
                        clipPath={`url(#${item}StarClip)`}
                        href={`#${item}Star`}
                        fill="#FFCC33"
                      />
                    </svg>
                  </span>
                </>
              );
            })}
          </div>
          <InputGroup className={styles.ReviewInput}>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              onChange={(e) => setReview(e.target.value)}
            />
            {console.log(review)}
          </InputGroup>
          <Button onClick={props.onHide}>등록하기</Button>
        </div>
      </section>
    </div>
  );
};

export default Modal_;
