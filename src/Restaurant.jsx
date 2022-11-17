import React, { useEffect } from "react";
import Header from "./Header";
import styles from "./styles/Restaurant.module.css";
import { AiFillStar, AiOutlineStar, AiFillTag } from "react-icons/ai";
import { useState } from "react";
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from "react-naver-maps";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Restaurant() {
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

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.ReviewModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            리뷰를 등록해주세요
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className={styles.StoreImgWrap}>
                <AiFillTag className={styles.Tag} />
                <span className={styles.TagContent}>청결한</span>
              </Col>
              <Col className={styles.StoreImgWrap}>
                <AiFillTag className={styles.Tag} />
                <span className={styles.TagContent}>맛있는</span>
              </Col>
              <Col className={styles.StoreImgWrap}>
                <AiFillTag className={styles.Tag} />
                <span className={styles.TagContent}>분위기좋은</span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.StoreImgWrap}>
                <AiFillTag className={styles.Tag} />
                <span className={styles.TagContent}>혼밥하기좋은</span>
              </Col>
              <Col className={styles.StoreImgWrap}>
                <AiFillTag className={styles.Tag} />
                <span className={styles.TagContent}>가성비좋은</span>
              </Col>
              <Col className={styles.StoreImgWrap}>
                <AiFillTag className={styles.Tag} />
                <span className={styles.TagContent}>모임하기좋은</span>
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
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>등록하기</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Header />
      <div className={styles.Container}>
        <form className={styles.SearchBox}>
          <input type="search" className={styles.Search}></input>
        </form>
        <div className={styles.Wrap}>
          <Container>
            <Row>
              <Col className={styles.StoreImgWrap}>
                <img
                  className={styles.StoreImg}
                  src="https://ifh.cc/g/75DTS7.jpg" // 통신시 변수로 받기
                  border="0"
                />
                <div>
                  <AiFillTag className={styles.Tag} />
                  <span className={styles.TagContent}>청결한</span>
                </div>
              </Col>
              <Col className={styles.StoreInfo}>
                <h2>디델리</h2>
                <span>상세설명 . . .</span>
              </Col>
              <Col>
                {starBtn ? (
                  <AiFillStar
                    className={styles.StarIcon}
                    onClick={() => {
                      setStartBtn(!starBtn);
                    }}
                    style={{ fill: "red" }}
                  />
                ) : (
                  <AiOutlineStar
                    className={styles.StarIcon}
                    onClick={() => {
                      setStartBtn(!starBtn);
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col className={styles.RateWrap}>
                <span className={styles.RateTitle}>평점</span>
                <div className={styles.RatingWrap}>
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
              </Col>
              <Col className={styles.MapWrap}>
                <RenderAfterNavermapsLoaded
                  ncpClientId="f36v2w1qcs"
                  error={<p>Maps Load Error</p>}
                  loading={<p>Maps Loading...</p>}
                >
                  <NaverMap
                    className={styles.Map}
                    mapDivId="map"
                    center={position}
                    defaultZoom={16}
                    zoomControl={true} // 지도 zoom 허용
                  >
                    <Marker
                      key={1}
                      position={position}
                      animation={2}
                      onClick={() => {
                        alert("여기는 디델리 입니다");
                      }}
                    />
                  </NaverMap>
                </RenderAfterNavermapsLoaded>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={styles.MapWrap}></div>
      </div>
      <hr />
      <div className={styles.ReviewWrap}>
        <h3 style={{ float: "left" }}>리뷰</h3>
        <Button
          variant="warning"
          className={styles.Btn}
          onClick={() => setModalShow(true)}
        >
          등록하기
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}
