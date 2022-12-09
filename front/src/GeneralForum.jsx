import React, { useState, useEffect, useMemo} from "react";
import Header from "./Header";
import styles from "./styles/GeneralForum.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "./Pagination";
import Table from "./Table";

export default function GeneralForum() {
  const [content, setContent] = useState();
  //카테고리 선택
  const [f_categoryId, setCategoryId] = useState(1);

  //글쓰고 띄우기
  const [write, setWrite] = useState(false)
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

  //posts 데이터

  let a = useSelector((state) => {
    return state.user;
  });
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/post/",
     {
      params:{
        categoryId: f_categoryId,
        page: currentPage-1,
        size: postsPerPage
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxdkJlY0Y4b29CaTdPcGkxZHFBSEgiLCJyb2xlIjoi7J2867CYIOyCrOyaqeyekCIsImV4cCI6MTY3Mjk0NDk1OH0._iIXYR1vpFXcfhjYFjAlyVadZIKm011e0vlsvr14RRM",
      }
     })
      .then((result) => {
        setPosts(result.data.content);
        setPostsnum(result.data.totalElements)
      })
      .catch((err) => {console.log(err)});
  }, [currentPage,f_categoryId,write]);

  return (
    <>
      <Header />
      <input className={styles.search} type="search"></input>

      <Container className={styles.ListForm}>
        <Row>
          <Col>
            <li className={styles.List} onClick = {()=>{
              setCategoryId(1);
              setCurrentPage(1);
            }}>전체</li>
          </Col>
          <Col>
            <li className={styles.List} onClick = {()=>{
              setCategoryId(2);
              setCurrentPage(1);
            }}> 추천합니다</li>
          </Col>
          <Col xs={2}>
            <li className={styles.List} onClick = {()=>{
              setCategoryId(3);
              setCurrentPage(1);
            }}>추천해주세요</li>
          </Col>
          <Col>
            <li className={styles.List} onClick = {()=>{
              setCategoryId(4);
              setCurrentPage(1);
            }}>같이 밥 먹을 사람</li>
          </Col>
        </Row>
      </Container>

      <table className={styles.register_content_table}>
        <tbody>
          <tr>
            <td>
              <input
                id="post"
                className={styles.register_content}
                type="text"
                value={content}
                autoComplete="off"
              ></input>
            </td>
            <td>
              <button
                onClick={() => {
                  if (document.getElementById("post").value.length > 0) {
                    axios
                    .post("http://52.44.107.157:8080/api/post/create",
                    {
                      contents: document.getElementById("post").value,
                      categoryId: f_categoryId,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxdkJlY0Y4b29CaTdPcGkxZHFBSEgiLCJyb2xlIjoi7J2867CYIOyCrOyaqeyekCIsImV4cCI6MTY3Mjk0NDk1OH0._iIXYR1vpFXcfhjYFjAlyVadZIKm011e0vlsvr14RRM",
                      },})
                    .then((result) => {
                      if(write===false){
                        setWrite(true);
                      }
                      else{
                        setWrite(false);
                      }
                    })
                    .catch((err) => {console.log(err)});
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

       {posts&&<Table columns={columns} data = {posts}/>}
      <Pagination
        className={styles.paging}
        postsPerPage={postsPerPage}
        totalPosts={postsnum}
        paginate={setCurrentPage}
      ></Pagination>
    </>
  );
}
