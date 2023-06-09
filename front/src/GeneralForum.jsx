import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import styles from "./styles/GeneralForum.module.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "./Pagination";
import ForumTable from "./ForumTable";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactGA from "react-ga";

export default function GeneralForum() {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  let location = useLocation();
  const [Error, setError] = useState(false);
  const handleClose = () => setError(false);

  const [content, setContent] = useState();

  //카테고리 선택
  const [f_categoryId, setCategoryId] = useState(1);

  //글쓰고 띄우기
  const [write, setWrite] = useState(false);
  //page 변수
  const [posts, setPosts] = useState([]);
  const [postsnum, setPostsnum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  //post Table 행이름
  const columns = useMemo(
    () => [
      {
        accessor: "category",
        Header: "카테고리",
      },
      {
        accessor: "contents",
        Header: "게시글 내용",
      },
      {
        accessor: "nickname",
        Header: "작성자",
      },
      {
        accessor: "date",
        Header: "등록날짜",
      },
      {
        accessor: "commentCount",
        Header: "댓글수",
      },
    ],
    []
  );

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/post/", {
        params: {
          categoryId: f_categoryId,
          page: currentPage - 1,
          size: postsPerPage,
          sort: "date,desc",
        },
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((result) => {
        setPosts(result.data.content);
        setPostsnum(result.data.totalElements);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [currentPage, f_categoryId, write]);

  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
      />

      <Container className={styles.ListForm}>
        <Row style={{ margin: "0 auto", textAlign: "center" }}>
          <Col>
            <li
              className={styles.List}
              onClick={() => {
                setCategoryId(1);
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "전체게시판",
                  label: "forum",
                });
              }}
              style={{
                backgroundColor:
                  f_categoryId == 1 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                color: f_categoryId == 1 ? "white" : "rgba(0,0,0,0.5)",
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
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "추천합니다",
                  label: "forum",
                });
              }}
              style={{
                backgroundColor:
                  f_categoryId == 2 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                color: f_categoryId == 2 ? "white" : "rgba(0,0,0,0.5)",
              }}
            >
              추천합니다
            </li>
          </Col>
          <Col>
            <li
              className={styles.List}
              onClick={() => {
                setCategoryId(3);
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "추천해주세요",
                  label: "forum",
                });
              }}
              style={{
                backgroundColor:
                  f_categoryId == 3 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                color: f_categoryId == 3 ? "white" : "rgba(0,0,0,0.5)",
              }}
            >
              추천해주세요
            </li>
          </Col>
          <Col>
            <li
              className={styles.List}
              onClick={() => {
                setCategoryId(4);
                setCurrentPage(1);
                ReactGA.event({
                  category: "Button",
                  action: "같이밥먹을사람",
                  label: "forum",
                });
              }}
              style={{
                backgroundColor:
                  f_categoryId == 4 ? "#06A77D" : "rgba(5, 47, 95, 0.1)",
                color: f_categoryId == 4 ? "white" : "rgba(0,0,0,0.5)",
              }}
            >
              같이 밥 먹을 사람
            </li>
          </Col>
        </Row>
      </Container>

      {f_categoryId === 1 ? (
        <>
          <input
            id="ForumSearch"
            className={styles.search}
            type="search"
            autoComplete="off"
          ></input>
          <Button
            className={styles.SearchBtn}
            onClick={() => {
              ReactGA.event({
                category: "Button",
                action: "게시글 검색",
                label: "search",
              });
              if (document.getElementById("ForumSearch").value.length > 0) {
                axios
                  .get("http://52.44.107.157:8080/api/post/search", {
                    params: {
                      keyword: document.getElementById("ForumSearch").value,
                      page: currentPage - 1,
                      size: postsPerPage,
                      sort: "date,desc",
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
                    //console.log(err);
                  });
              } else {
                setError(true);
              }
            }}
          >
            검색
          </Button>
        </>
      ) : (
        <div></div>
      )}
      {f_categoryId != 1 && (
        <table className={styles.register_content_table}>
          <tbody>
            <tr>
              <td>
                <textarea
                  id="post"
                  className={styles.register_content}
                  type="text"
                  value={content}
                  autoComplete="off"
                  size="100"
                ></textarea>
              </td>
              <td>
                <button
                  onClick={() => {
                    ReactGA.event({
                      category: "Button",
                      action: "게시글등록",
                      label: "forum",
                    });
                    if (
                      document.getElementById("post").value.length > 0 &&
                      f_categoryId != 1
                    ) {
                      axios
                        .post(
                          "http://52.44.107.157:8080/api/post/create",
                          {
                            contents: document.getElementById("post").value,
                            categoryId: f_categoryId,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${location.state.token}`,
                            },
                          }
                        )
                        .then((result) => {
                          if (write === false) {
                            setWrite(true);
                          } else {
                            setWrite(false);
                          }
                          document.getElementById("post").value = "";
                        })
                        .catch((err) => {
                          //console.log(err);
                        });
                    } else {
                      setError(true);
                    }
                  }}
                  className={styles.register_button}
                >
                  등록
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {posts && (
        <>
          <ForumTable
            columns={columns}
            data={posts}
            email={location.state.email}
            nickname={location.state.nickname}
            token={location.state.token}
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
