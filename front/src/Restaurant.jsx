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

export default function Restaurant() {
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

  console.log(location.state);

  let storeId = location.state && location.state.storeId;
  let rr = location.state && location.state.re;

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = async () => {
    setModalOpen(false);
    await setRe(!re);
  };
  console.log(re);

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
  const [myReview, setMyReview] = useState([]);

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
        console.log(res);
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
      })
      .catch((err) => {
        console.log(err);
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
        <form className={styles.SearchBox}>
          <input type="search" className={styles.Search}></input>
        </form>
        <hr style={{ marginTop: "3%", width: "110%", marginLeft: "-3%" }} />
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <h1 className={styles.StoreName}>{storeName}</h1>
          {starBtn ? (
            <AiFillStar
              className={styles.StarIcon}
              onClick={() => {
                setStartBtn(!starBtn);
              }}
              style={{ fill: "#06A77D" }}
            />
          ) : (
            <AiOutlineStar
              className={styles.StarIcon}
              onClick={() => {
                setStartBtn(!starBtn);
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
                  <AiFillTag className={styles.Tag} />
                  {tags &&
                    tags.map((a, i) => {
                      return (
                        <span className={styles.TagContent}>{a.tagName}</span>
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
        />
      </div>
      {posts && (
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
      )}

      <Pagination
        className={styles.paging}
        postsPerPage={postsPerPage}
        totalPosts={postsnum}
        paginate={setCurrentPage}
      ></Pagination>
    </>
  );
}
