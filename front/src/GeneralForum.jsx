import React, { useState } from "react";
import Header from "./Header";
import styles from "./styles/GeneralForum.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addItem } from "./post/postSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function GeneralForum() {
  let dispatch = useDispatch();
  const [content, setContent] = useState();
  let a = useSelector((state) => {
    return state.user;
  });
  let navigate = useNavigate();
  return (
    <>
      <Header />
      <input className={styles.search} type="search"></input>

      <Container className={styles.ListForm}>
        <Row>
          <Col>
            <li className={styles.List}>전체</li>
          </Col>
          <Col>
            <li className={styles.List}> 추천합니다</li>
          </Col>
          <Col xs={2}>
            <li className={styles.List}>추천해주세요</li>
          </Col>
          <Col>
            <li className={styles.List}>같이 밥 먹을 사람</li>
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
                onChange={(e) => setContent(e.target.value)}
              ></input>
            </td>
            <td>
              <button
                onClick={() => {
                  if (document.getElementById("post").value.length > 0) {
                    dispatch(
                      addItem({
                        recommended: 0,
                        post_value: document.getElementById("post").value,
                        id: "hbk",
                        date: "20xx/xx/xx",
                      })
                    );
                    setContent("");
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

      <table className={styles.show_content}>
        <tbody>
          <tr>
            <td colSpan="1">추천합니다</td>
            <td colSpan="1">게시글 내용</td>

            <td colSpan="1">작성자</td>
            <td colSpan="1">날짜</td>
          </tr>
        </tbody>
      </table>

      {a.map((s, i) => {
        return (
          <table className={styles.show_contentList} key={i}>
            <tbody>
              <tr
                onClick={() => {
                  navigate("/ForumDetail/" + i);
                }}
              >
                {s.recommended && <td colSpan="1">{s.recommended}</td>}
                {s.post_value && <td colSpan="1">{s.post_value}</td>}
                {s.id && <td colSpan="1">{s.id}</td>}
                {s.date && <td colSpan="1">{s.date}</td>}
              </tr>
            </tbody>
          </table>
        );
      })}
    </>
  );
}
