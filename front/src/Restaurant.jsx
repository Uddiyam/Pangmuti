import React, { useEffect } from "react";
import Header from "./Header";
import styles from "./styles/Restaurant.module.css";
import { AiFillStar, AiOutlineStar, AiFillTag } from "react-icons/ai";
import { useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import Modal_ from "./Modal_";
import Table from "./TableReview";
import Pagination from "./Pagination";
import axios from "axios";
import Map from "./Map";
import ReactGA from "react-ga";

export default function Restaurant() {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  const [starBtn, setStartBtn] = useState(false);
  const location = useLocation();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [menuImg, setMenuImg] = useState("");
  const [storeImg, setStoreImg] = useState("");
  const [storeName, setStoreName] = useState("");
  const [tags, setTags] = useState([]);
  const [grade, setGrade] = useState();
  const [address, setAddress] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [phone, setPhone] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [category, setCategory] = useState("");
  const [re, setRe] = useState(false);
  const [bookmark, setBookmark] = useState();
  const [date, setDate] = useState("");

  let storeId = location.state && location.state.storeId;
  let rr = location.state && location.state.re;

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    ReactGA.event({
      category: "Button",
      action: "리뷰등록",
      label: "review",
    });
  };
  const closeModal = async () => {
    setModalOpen(false);
    await setRe(!re);
  };

  const columns = useMemo(
    () => [
      {
        accessor: "nickname",
        Header: "닉네임",
      },
      {
        accessor: "contents",
        Header: "내용",
      },

      {
        accessor: "grade",
        Header: "평점",
      },
      {
        accessor: "tag",
        Header: "태그",
      },
      {
        accessor: "date",
        Header: "등록날짜",
      },
    ],
    []
  );

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [postsnum, setPostsnum] = useState(0);

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/store/detail", {
        params: {
          storeId: storeId,
          page: currentPage - 1,
          size: postsPerPage,
          sort: "date,desc",
        },

        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((res) => {
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
        setMenuImg(res.data.menuImage);
        setStoreImg(res.data.storeImage);
        setStoreName(res.data.storeName);
        setPosts(res.data.reviewList.content);

        setPostsnum(res.data.reviewList.totalElements);
        setTags(res.data.tagList);
        setGrade(res.data.grade);
        setAddress(res.data.address);
        setOpenTime(res.data.openTime);
        setCloseTime(res.data.closeTime);
        setPhone(res.data.phone);
        setMinPrice(res.data.minPrice);
        setMaxPrice(res.data.maxPrice);
        setCategory(res.data.category);
        setBookmark(res.data.bookmark);
        setDate(res.data.updateDate);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [re, currentPage, rr]);

  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
        Img={location.state.Img}
      />
      <div className={styles.Container}>
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <h1 className={styles.StoreName}>{storeName}</h1>
          {bookmark ? (
            <AiFillStar
              className={styles.StarIcon}
              onClick={async () => {
                ReactGA.event({
                  category: "Button",
                  action: "즐겨찾기삭제",
                  label: "bookmark",
                });
                await axios
                  .delete("http://52.44.107.157:8080/api/bookmark/delete", {
                    data: {
                      storeId: storeId,
                    },
                    headers: {
                      Authorization: `Bearer ${location.state.token}`,
                    },
                  })
                  .then((result) => {
                    setBookmark(false);
                  })
                  .catch((err) => {
                    //console.log(err);
                  });
              }}
              style={{ fill: "#D5C67A" }}
            />
          ) : (
            <AiOutlineStar
              className={styles.StarIcon}
              style={{ fill: "#e8eef7" }}
              onClick={async () => {
                ReactGA.event({
                  category: "Button",
                  action: "즐겨찾기등록",
                  label: "bookmark",
                });
                await axios
                  .post(
                    "http://52.44.107.157:8080/api/bookmark/create",
                    {
                      storeId: storeId,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${location.state.token}`,
                      },
                    }
                  )
                  .then((res) => {
                    setBookmark(true);
                  })
                  .catch((err) => {
                    // console.log(err);
                  });
              }}
            />
          )}
        </div>
        <div className={styles.Wrap}>
          <Container>
            <Row>
              <Col className={styles.StoreImgWrap} xs={3}>
                <img className={styles.StoreImg} src={storeImg} border="0" />
                <div>
                  {tags &&
                    tags.map((a, i) => {
                      return (
                        <>
                          <div>
                            <AiFillTag className={styles.Tag} />
                            <span className={styles.TagContent}>
                              {a.tagName}
                            </span>
                          </div>
                        </>
                      );
                    })}
                </div>
              </Col>
              <Col>
                <img className={styles.StoreImg} src={menuImg} border="0" />
              </Col>

              <Col>
                {latitude && <Map latitude={latitude} longitude={longitude} />}
              </Col>
            </Row>
            <Row className={styles.Row2}>
              <Col className={styles.RateWrap} xs={3}>
                <div className={styles.RateTitle}>평점</div>
                <div className={styles.RatingWrap}>
                  <AiFillStar
                    className={styles.Star}
                    style={{ fill: "#F1A208" }}
                  />
                  <span style={{ fontSize: "larger", fontWeight: "bold" }}>
                    {grade}
                  </span>
                </div>
              </Col>
              <Col className={styles.StoreInfo}>
                <br />

                <p>주소 : {address}</p>
                <p>
                  영업시간 : {openTime}-{closeTime}
                </p>
                <p>카테고리 : {category}</p>
                <p>전화번호 : {phone}</p>
                <p>
                  가격대 : {minPrice * 1000}- {maxPrice * 1000}
                </p>
                <p style={{ fontSize: "small", textAlign: "right" }}>
                  최근 수정일 : {date}
                </p>
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
          variant="primary"
          className={styles.Btn}
          onClick={() => openModal()}
        >
          등록하기
        </Button>
        <Modal_
          open={modalOpen}
          close={closeModal}
          email={location.state.email}
          nickname={location.state.nickname}
          token={location.state.token}
          storeId={storeId}
          Img={location.state.Img}
        />
      </div>
      {posts && (
        <>
          <Table
            columns={columns}
            data={posts}
            email={location.state.email}
            nickname={location.state.nickname}
            token={location.state.token}
            storeId={storeId}
            re={re}
            Img={location.state.Img}
          />
          <Pagination
            className={styles.paging}
            postsPerPage={postsPerPage}
            totalPosts={postsnum}
            paginate={setCurrentPage}
            currentPage={currentPage}
          ></Pagination>
        </>
      )}
    </>
  );
}
