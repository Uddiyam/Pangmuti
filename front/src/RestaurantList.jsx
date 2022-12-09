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

export default function RestaurantList() {
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
    ],
    []
  );

  const [posts, setPosts] = useState([]);
  const [postsnum, setPostsnum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  let location = useLocation();
  console.log(location.state);

  //카테고리 선택
  const [categoryId, setCategoryId] = useState(1);

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/store", {
        params: {
          categoryId: 3,
          tagId: 1,
          page: 0,
          size: 3,
          sort: "storeName,desc",
        },

        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data.content);
        setPostsnum(res.data.totalElements);
        setPosts(res.data.content);
        setPostsnum(res.data.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, categoryId]);

  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
      />
      <div className={styles.Container}>
        <form className={styles.SearchBox}>
          <input type="search" className={styles.Search}></input>
        </form>
        <Container className={styles.ListForm}>
          <Row>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(1);
                  setCurrentPage(1);
                }}
                style={{
                  backgroundColor:
                    categoryId == 1
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 1 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                전체
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(2);
                  setCurrentPage(2);
                }}
                style={{
                  backgroundColor:
                    categoryId == 2
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 2 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                한식
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(4);
                  setCurrentPage(4);
                }}
                style={{
                  backgroundColor:
                    categoryId == 4
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 4 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                일식
              </li>
            </Col>
            <Col xs={2}>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(5);
                  setCurrentPage(5);
                }}
                style={{
                  backgroundColor:
                    categoryId == 5
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 5 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                양식/패스트푸드
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(3);
                  setCurrentPage(3);
                }}
                style={{
                  backgroundColor:
                    categoryId == 3
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 3 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                중식/아시안
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(9);
                  setCurrentPage(9);
                }}
                style={{
                  backgroundColor:
                    categoryId == 9
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 9 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                분식
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(8);
                  setCurrentPage(8);
                }}
                style={{
                  backgroundColor:
                    categoryId == 8
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 8 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                술집
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(6);
                  setCurrentPage(6);
                }}
                style={{
                  backgroundColor:
                    categoryId == 6
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 6 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                카페/디저트
              </li>
            </Col>
            <Col>
              <li
                className={styles.List}
                onClick={() => {
                  setCategoryId(7);
                  setCurrentPage(7);
                }}
                style={{
                  backgroundColor:
                    categoryId == 7
                      ? "rgba(5, 47, 95, 1)"
                      : "rgba(5, 47, 95, 0.3)",
                  color: categoryId == 7 ? "#F1A208" : "rgba(0,0,0,0.5)",
                }}
              >
                편의점
              </li>
            </Col>
          </Row>
        </Container>
      </div>
      {console.log(posts)}
      {posts && <Table columns={columns} data={posts} />}
      <Pagination
        className={styles.paging}
        postsPerPage={postsPerPage}
        totalPosts={postsnum}
        paginate={setCurrentPage}
      ></Pagination>
    </>
  );
}
