import React, { useEffect } from "react";
import Header from "./Header";
import styles from "./styles/Restaurant.module.css";
import { AiFillStar, AiOutlineStar, AiFillTag } from "react-icons/ai";
import { useState, useMemo } from "react";
import { NaverMap, RenderAfterNavermapsLoaded, Marker } from "react-naver-maps";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import Modal_ from "./Modal_";
import Table from "./Table";

export default function Restaurant() {
  const [starBtn, setStartBtn] = useState(false);
  const location = useLocation();
  console.log(location.state);

  let review = location.state && location.state.review;
  let date = location.state && location.state.date;
  const navermaps = window.naver.maps;
  let position = new navermaps.LatLng(37.6203955, 127.0584779); // 통신시 변수로 받기
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

  //console.log(tag);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "닉네임",
      },
      {
        accessor: "review",
        Header: "내용",
      },
      {
        accessor: "date",
        Header: "등록날짜",
      },
    ],
    []
  );

  let dd =
    date &&
    review &&
    Array(review.length)
      .fill()
      .map((a, i) => ({
        review: review[i],
        date: date[i],
      }));
  console.log(dd);
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
              <Col className={styles.StoreImgWrap} xs={3}>
                <img
                  className={styles.StoreImg}
                  src="https://ifh.cc/g/75DTS7.jpg" // 통신시 변수로 받기
                  border="0"
                />
                <div>
                  <AiFillTag className={styles.Tag} />
                  <span className={styles.TagContent}>청결한</span> {/*통신*/}
                </div>
              </Col>
              <Col>
                <img
                  className={styles.StoreImg}
                  src="https://ifh.cc/g/MmhMc4.jpg" // 통신시 변수로 받기
                  border="0"
                />
              </Col>
              <Col>
                <RenderAfterNavermapsLoaded
                  ncpClientId="f36v2w1qcs"
                  error={<p>에러가 발생했어요</p>}
                  loading={<p>지도가 로딩중이에요</p>}
                >
                  <NaverMap
                    className={styles.Map}
                    mapDivId="map"
                    center={position}
                    zoomControl={true}
                    defaultZoom={17}
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
            <Row>
              <Col className={styles.RateWrap} xs={3}>
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
              <Col className={styles.StoreInfo}>
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
                <h2 className={styles.StoreName}>디델리</h2>
                <br />
                <br />
                <span>상세설명 . . .</span>
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
          onClick={() => openModal()}
        >
          등록하기
        </Button>
        <Modal_ open={modalOpen} close={closeModal} />
      </div>
      {date && review && <Table columns={columns} data={dd} />};
    </>
  );
}
