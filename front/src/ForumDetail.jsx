import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import styles from "./styles/ForumDetail.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactGA from "react-ga";
import Pagination from "./Pagination";

export default function ForumDetail() {
  let { id } = useParams();
  let location = useLocation();
  let [detail, setDetail] = useState({});
  let [comments, setComments] = useState({ content: "" });
  let [pagere, setPageRe] = useState(true);
  let [usernick, setUsernick] = useState("");
  const [commentNum, setCommentNum] = useState();
  let navigate = useNavigate();

  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);

  const [postsnum, setPostsnum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/post/detail", {
        params: {
          postId: id,
          page: currentPage - 1,
          size: postsPerPage,
          sort: "date,desc",
        },
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((result) => {
        setDetail(result.data);
        setComments(result.data.commentList);
        setUsernick(result.data.nickname);
        setCommentNum(result.data.commentList.totalElements);
        console.log(result);

        setPostsnum(result.data.commentList.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagere, currentPage]);

  const [Error, setError] = useState(false);
  const [content, setContent] = useState(false);
  const handleCloseOnly = () => {
    setError(false);
  };
  const ContentClose = () => {
    setContent(false);
  };
  const handleClose = () => {
    setError(false);
    axios
      .delete("http://52.44.107.157:8080/api/post/delete", {
        data: {
          postId: id,
        },
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((result) => {
        navigate("/Forum", {
          state: {
            email: location.state.email,
            token: location.state.token,
            nickname: location.state.nickname,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* 헤더 */}
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
        Img={location.state.Img}
      />

      {/* 게시글 상세페이지 */}
      <div className={styles.DetailTop}>
        <div className={styles.Nickname}>{detail.nickname}</div>
        <div className={styles.Date}>{detail.date}</div>
        {usernick === location.state.nickname ? (
          <a
            className={styles.Delete}
            onClick={() => {
              setError(true);
            }}
          >
            삭제
          </a>
        ) : (
          <div></div>
        )}
      </div>
      <hr className={styles.Line}></hr>
      <div className={styles.Post}>{detail.contents}</div>

      <div className={styles.CommentTitle}>댓글 ({commentNum})</div>
      {/* 댓글 다는 곳 */}
      <div className={styles.RegisterContentTable}>
        <div className={styles.RegisterContentTableBody}>
          <input
            id="comment"
            className={styles.RegisterContent}
            type="text"
            autoComplete="off"
          ></input>
          <button
            onClick={() => {
              if (document.getElementById("comment").value.length > 0) {
                axios
                  .post(
                    "http://52.44.107.157:8080/api/comment/create",
                    {
                      postId: id,
                      contents: document.getElementById("comment").value,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${location.state.token}`,
                      },
                    }
                  )
                  .then((result) => {
                    if (pagere === true) {
                      setPageRe(false);
                      document.getElementById("post").value = "";
                    } else {
                      setPageRe(true);
                      document.getElementById("post").value = "";
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                document.getElementById("comment").value = "";
              } else {
                setContent(true);
              }
            }}
            className={styles.RegisterButton}
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 리스트 */}
      {comments.content.length > 0
        ? comments.content.map((a, s) => {
            return (
              <div className={styles.CommentLine}>
                <hr className={styles.CommentCLine}></hr>
                <div className={styles.CommentHeader}>
                  <div className={styles.NicknameSecond}>{a.nickname}</div>
                  <div className={styles.CommentDate}>{a.date}</div>
                  {a.myComment ? (
                    <div
                      onClick={() => {
                        axios
                          .delete(
                            "http://52.44.107.157:8080/api/comment/delete",
                            {
                              data: {
                                commentId: a.commentId,
                              },
                              headers: {
                                Authorization: `Bearer ${location.state.token}`,
                              },
                            }
                          )
                          .then((result) => {
                            if (pagere === true) {
                              setPageRe(false);
                            } else {
                              setPageRe(true);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                      className={styles.Delete2}
                    >
                      삭제
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className={styles.CommentContent}>{a.contents}</div>
              </div>
            );
          })
        : console.log("오류!")}
      <Pagination
        className={styles.paging}
        postsPerPage={postsPerPage}
        totalPosts={postsnum}
        paginate={setCurrentPage}
      ></Pagination>
      <div>
        <Modal show={Error} onHide={handleCloseOnly} className={styles.Modal}>
          <Modal.Body className={styles.ModalContent}>
            정말 삭제하시겠습니까?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleClose}
              className={styles.Btn}
            >
              확인
            </Button>
            <Button
              variant="primary"
              onClick={handleCloseOnly}
              className={styles.Btn}
            >
              취소
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={content} onHide={ContentClose} className={styles.Modal}>
          <Modal.Body className={styles.ModalContent}>
            내용을 입력해 주세요
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={ContentClose}
              className={styles.Btn}
            >
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
