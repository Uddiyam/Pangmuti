import React, { useEffect, useState, useMemo } from "react";
import Header from "./Header";
import styles from "./styles/RestaurantList.module.css";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "./Pagination";
import Table from "./TableRestaurant";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ReactGA from "react-ga";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function RestaurantList() {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  //post Table 행이름
  const columns = useMemo(
    () => [
      {
        accessor: "category",
        Header: "카테고리",
      },
      {
        accessor: "storeImage",
        Header: "Img",
        Cell: ({ value }) => <img src={value} width={100} height={70} />,
      },
      {
        accessor: "storeName",
        Header: "가게명",
      },
      {
        accessor: "grade",
        Header: "평점",
      },
      {
        accessor: "reviewCount",
        Header: "리뷰수",
      },
      {
        accessor: "bookmarkCount",
        Header: "즐겨찾기수",
      },
    ],
    []
  );

  const [posts, setPosts] = useState([]);
  const [postsnum, setPostsnum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  let location = useLocation();
  const [Error, setError] = useState(false);
  const handleClose = () => setError(false);
  const [sort, setSort] = useState("");
  const [sortName, setSortName] = useState("기본");
  //카테고리 선택
  const [categoryId, setCategoryId] = useState(1);
  const [tagId, setTagId] = useState(1);

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/store/", {
        params: {
          categoryId: categoryId,
          tagId: tagId,
          page: currentPage - 1,
          size: postsPerPage,
          sort: sort,
        },

        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.content);
        setPostsnum(res.data.totalElements);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [currentPage, categoryId, tagId, sort]);

  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
      />
      <div className={styles.Container}>
        {categoryId == 1 && tagId == 1 && (
          <form className={styles.SearchBox}>
            <input
              id="RestaurantSearch"
              type="search"
              className={styles.Search}
              autoComplete="off"
            ></input>
            <Button
              className={styles.SearchBtn}
              onClick={() => {
                ReactGA.event({
                  category: "Button",
                  action: "음식점 검색",
                  label: "search",
                });
                if (
                  document.getElementById("RestaurantSearch").value.length > 0
                ) {
                  axios
                    .get("http://52.44.107.157:8080/api/store/search", {
                      params: {
                        keyword:
                          document.getElementById("RestaurantSearch").value,
                        page: currentPage - 1,
                        size: postsPerPage,
                      },
                      headers: {
                        Authorization: `Bearer ${location.state.token}`,
                      },
                    })
                    .then((result) => {
                      setPosts(result.data.content);
                      setPostsnum(result.data.totalElements);
                      document.getElementById("ForumSearch").value = "";
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                } else {
                  setError(true);
                }
              }}
            >
              검색
            </Button>
          </form>
        )}
        <Container className={styles.ListForm}>
          <Row style={{ textAlign: "center", margin: "0 auto" }}>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "전체카테고리",
                    label: "category",
                  });
                  setCategoryId(1);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 1 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 1 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                전체
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "한식",
                    label: "category",
                  });
                  setCategoryId(2);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 2 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 2 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                한식
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "일식",
                    label: "category",
                  });
                  setCategoryId(4);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 4 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 4 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                일식
              </li>
            </Col>
            <Col xs={2}>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "양식/패스트푸드",
                    label: "category",
                  });
                  setCategoryId(5);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 5 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 5 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                양식/패스트푸드
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "중식/아시안",
                    label: "category",
                  });
                  setCategoryId(3);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 3 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 3 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                중식/아시안
              </li>
            </Col>
            <Col
              style={{
                textAlign: "center",
                margin: "0 auto",
                paddingLeft: "5%",
              }}
            >
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "분식",
                    label: "category",
                  });
                  setCategoryId(9);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 9 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 9 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                분식
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "술집",
                    label: "category",
                  });
                  setCategoryId(8);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 8 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 8 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                술집
              </li>
            </Col>
            <Col
              style={{
                textAlign: "center",
                margin: "0 auto",
                paddingRight: "5%",
              }}
            >
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "카페/디저트",
                    label: "category",
                  });
                  setCategoryId(6);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 6 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 6 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                카페/디저트
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "편의점",
                    label: "category",
                  });
                  setCategoryId(7);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 7 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: categoryId == 7 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                편의점
              </li>
            </Col>
          </Row>

          <Row
            style={{ textAlign: "center", margin: "0 auto" }}
            className={styles.TagList}
          >
            <Col>
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "태그전체",
                    label: "tag",
                  });
                  setTagId(1);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 1 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 1 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                태그전체
              </li>
            </Col>
            <Col>
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "혼밥하기좋은",
                    label: "tag",
                  });
                  setTagId(2);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 2 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 2 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                혼밥하기좋은
              </li>
            </Col>
            <Col>
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "분위기좋은",
                    label: "tag",
                  });
                  setTagId(3);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 3 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 3 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                분위기좋은
              </li>
            </Col>
            <Col xs={2}>
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "가성비좋은",
                    label: "tag",
                  });
                  setTagId(4);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 4 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 4 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                가성비좋은
              </li>
            </Col>
            <Col>
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "모임하기좋은",
                    label: "tag",
                  });
                  setTagId(5);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 5 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 5 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                모임하기좋은
              </li>
            </Col>
            <Col
              style={{
                textAlign: "center",
                margin: "0 auto",
                paddingLeft: "5%",
              }}
            >
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "맛있는",
                    label: "tag",
                  });
                  setTagId(6);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 6 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 6 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                맛있는
              </li>
            </Col>
            <Col>
              <li
                className={styles.Tag}
                onClick={() => {
                  ReactGA.event({
                    category: "Button",
                    action: "청결한",
                    label: "tag",
                  });
                  setTagId(7);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    tagId == 7 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                  color: tagId == 7 ? "white" : "rgba(0,0,0,0.5)",
                }}
              >
                청결한
              </li>
            </Col>
          </Row>
          <Row style={{ marginTop: "3%", marginBottom: "-5%" }}>
            <Col>
              <span className={styles.SortName}>{sortName}</span>
            </Col>
            <Col>
              <DropdownButton title="정렬" className={styles.Sort}>
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    ReactGA.event({
                      category: "Button",
                      action: "리뷰수순",
                      label: "sort",
                    });
                    setSort("reviewCount,desc");
                    setSortName("리뷰수순");
                  }}
                >
                  리뷰수순
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    ReactGA.event({
                      category: "Button",
                      action: "즐겨찾기순",
                      label: "sort",
                    });
                    setSort("bookmarkCount,desc");
                    setSortName("즐겨찾기순");
                  }}
                >
                  즐겨찾기순
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    ReactGA.event({
                      category: "Button",
                      action: "평점순",
                      label: "sort",
                    });
                    setSort("grade,desc");
                    setSortName("평점순");
                  }}
                >
                  평점순
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Container>
      </div>
      {posts && (
        <Table
          columns={columns}
          data={posts}
          email={location.state.email}
          token={location.state.token}
          nickname={location.state.nickname}
          Img={location.state.Img}
        />
      )}
      <Pagination
        className={styles.paging}
        postsPerPage={postsPerPage}
        totalPosts={postsnum}
        paginate={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
      <Modal show={Error} onHide={handleClose} className={styles.Modal}>
        <Modal.Body>내용을 입력해 주세요</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
