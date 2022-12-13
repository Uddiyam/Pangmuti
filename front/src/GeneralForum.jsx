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
import { getSelectionRange } from "@testing-library/user-event/dist/utils";

export default function GeneralForum() {
  let location = useLocation();
  console.log(location.state);

  const [content, setContent] = useState();
  //검색 단어
  const [forumSearch, setForumSearch] = useState("");
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
    ],
    []
  );

  let a = useSelector((state) => {
    return state.user;
  });
  let navigate = useNavigate();

  //posts 데이터

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/post/", {
        params: {
          categoryId: f_categoryId,
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, f_categoryId, write]);

  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
        Img={location.state.Img}
      />
      <input id = "ForumSearch" className={styles.search} type="search"></input>
        <button
          onClick={() => {
            if (
              document.getElementById("ForumSearch").value.length > 0 
            ) {
              axios
                .get("http://52.44.107.157:8080/api/post/search",{
                  params:{
                    keyword: document.getElementById("ForumSearch").value,
                    page: currentPage - 1,
                    size: postsPerPage,
                  },
                  headers: {
                      Authorization: `Bearer ${location.state.token}`,
                    },
                  }
                )
                .then((result) => {
                  console.log(result);
                  setPosts(result.data.content);
                  setPostsnum(result.data.totalElements);
                  document.getElementById("ForumSearch").value = "";
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert("내용을 입력해주세요!");
            }
          }}
        >
          검색
      </button>

      <Container className={styles.ListForm}>
        <Row style={{ margin: "0 auto", textAlign: "center" }}>
          <Col>
            <li
              className={styles.List}
              onClick={() => {
                setCategoryId(1);
                setCurrentPage(1);
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
                ></textarea>
              </td>
              <td>
                <button
                  onClick={() => {
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
                          console.log(result);
                          if (write === false) {
                            setWrite(true);
                          } else {
                            setWrite(false);
                          }
                          document.getElementById("post").value = "";
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      alert("내용을 입력해주세요!");
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
        <ForumTable
          columns={columns}
          data={posts}
          email={location.state.email}
          nickname={location.state.nickname}
          token={location.state.token}
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