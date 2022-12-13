import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import styles from "./styles/ForumDetail.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ForumDetail() {
  let { id } = useParams();
  let location = useLocation();
  let [detail, setDetail] = useState({});
  let [comments, setComments] = useState({ content: "" });
  let [pagere, setPageRe] = useState(true);
  let [usernick, setUsernick] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://52.44.107.157:8080/api/post/detail", {
        params: {
          postId: id,
        },
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        },
      })
      .then((result) => {
        setDetail(result.data);
        setComments(result.data.commentList);
        setUsernick(result.data.nickname);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagere]);

  return (
    <>
      {/* 헤더 */}
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
      />

      {/* 게시글 상세페이지 */}
      <div className={styles.DetailTop}>
        <div className={styles.Nickname}>{detail.nickname}</div>
        <div className={styles.Date}>{detail.date}</div>
        {usernick === location.state.nickname ? (
          <a
            className={styles.Delete}
            onClick={() => {
              window.confirm("정말로 삭제하시겠습니까??")
                ? axios
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
                    })
                : console.log("취소");
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

      <div className={styles.CommentTitle}>댓글</div>
      {/* 댓글 다는 곳 */}
      <div className={styles.RegisterContentTable}>
        <div className ={styles.RegisterContentTableBody}>
             <input id = 'comment' className={styles.RegisterContent} type="text"></input>
             <button onClick={()=>{
             if(document.getElementById('comment').value.length>0){
              axios
              .post("http://52.44.107.157:8080/api/comment/create", {
                postId: id,
                contents: document.getElementById('comment').value
              },
              {
                headers: {
                  Authorization: `Bearer ${location.state.token}`,
                },
              })
              .then((result) => {
                if(pagere === true){
                  setPageRe(false);
                  document.getElementById("post").value = "";
                }
                else{
                  setPageRe(true);
                  document.getElementById("post").value = "";
                }
              })
              .catch((err) => {
                console.log(err);
              });
              }
              else{
                alert('내용을 입력해주세요!')
              }
            }}
            className={styles.RegisterButton}
          >
            등록{" "}
          </button>
        </div>
      </div>

      {/* 댓글 리스트 */}
      {comments.content.length > 0
        ? comments.content.reverse().map((a, s) => {
            return (
              <div className={styles.CommentLine}>
                <hr className={styles.CommentCLine}></hr>
                <div className={styles.CommentHeader}>
                  <div className={styles.NicknameSecond}>{a.nickname}</div>
                  <div className={styles.CommentDate}>{a.date}</div>
                  {
              a.myComment?
              <div onClick={()=>{
                axios
                .delete("http://52.44.107.157:8080/api/comment/delete",{ 
                data:{
                  commentId: a.commentId
                },
                headers: {
                    Authorization: `Bearer ${location.state.token}`,
                  },
                })
                .then((result) => {
                  if(pagere === true){
                    setPageRe(false);
                  }
                  else{
                    setPageRe(true);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              }} className={styles.Delete2}>삭제</div>:
              <div></div>
            }
                </div>
                <div className={styles.CommentContent}>{a.contents}</div>
              </div>
            );
          })
        : console.log("이런")}
      <div></div>
    </>
  );
}
