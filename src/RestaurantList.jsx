import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "./styles/RestaurantList.module.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "./Pagination";
import axios from "axios";
import Posts from "./Posts";

export default function RestaurantList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
      setLoading(true);
      console.log(response);
    };
    fetchData();
  }, []);

  /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  return (
    <>
      <Header />
      <div className={styles.Container}>
        <form className={styles.SearchBox}>
          <input type="search" className={styles.Search}></input>
        </form>
        <Container className={styles.ListForm}>
          <Row>
            <Col>
              <li className={styles.List}>전체</li>
            </Col>
            <Col>
              <li className={styles.List}>일식</li>
            </Col>
            <Col xs={2}>
              <li className={styles.List}>양식/패스트푸드</li>
            </Col>
            <Col>
              <li className={styles.List}>중식/아시안</li>
            </Col>
            <Col>
              <li className={styles.List}>분식</li>
            </Col>
            <Col>
              <li className={styles.List}>술집</li>
            </Col>
            <Col>
              <li className={styles.List}>카페/디저트</li>
            </Col>
            <Col>
              <li className={styles.List}>편의점</li>
            </Col>
          </Row>
        </Container>
      </div>
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      ></Pagination>
    </>
  );
}
