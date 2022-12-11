import React, { useEffect, useState } from "react";
import Header from "./Header";
import styles from "./styles/Mypage.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Mypage() {
  //사용자 닉네임 설정
  let [ userNickname, setUserNickname ] = useState("");
  //사용자 닉네입 입력
  let [ inputUserNick, setInputUserNick ] = useState("");
  //사용자 이메일 설정
  let [ userEmail, setUserEmail ] = useState();
  //닉네임 중복 확인
  let [ nicknameTF, setNicknameTF]  = useState();
  //카테고리 선택
  let [ categoryId, setCategoryId] = useState("");
  //카테고리 이ㄻ
  let [ categoryName, setCategoryName] = useState("");
  //작성했던 글들 리스트,
  let [ userlist, setUserlist] = useState([{contents:""}]);
  //로그인 상태 확인
  let location = useLocation();

  //mypage 정보 get
  useEffect(() => {
    categoryId===""?
    axios
      .get("http://52.44.107.157:8080/api/mypage/", {
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((result) => {
        setUserNickname(result.data.nickname);
        setUserEmail(result.data.email);
      })
      .catch((err) => {
        console.log(err);
      }):
   categoryId === "bookmark"?
      axios
      .get("http://52.44.107.157:8080/api/mypage/bookmark", {
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((result) => {
        setUserlist(result.data.content);
        setCategoryName("즐겨찾기한 음식점");
      })
      .catch((err) => {
        console.log(err);
      }):
    categoryId === "review"?
      axios
      .get("http://52.44.107.157:8080/api/mypage/review", {
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((result) => {
        setUserlist(result.data.content);
        setCategoryName("내가 쓴 리뷰");
      })
      .catch((err) => {
        console.log(err);
      }):
    categoryId === "post"?
      axios
      .get("http://52.44.107.157:8080/api/mypage/post", {
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((result) => {
        setUserlist(result.data.content);
        setCategoryName("내가 쓴 게시글");
      })
      .catch((err) => {
        console.log(err);
      }):
    categoryId === "comment"?
      axios
      .get("http://52.44.107.157:8080/api/mypage/comment", {
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((result) => {
        setUserlist(result.data.content);
        setCategoryName("내가 쓴 댓글");
      })
      .catch((err) => {
        console.log(err);
      }):
      console.log("오류");
  }, [categoryId]);

  //닉네임 중복 확인
  const Nickname = () => {
    axios
      .post("http://52.44.107.157:8080/api/mypage/check", {
        nickname: inputUserNick,
      },{
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((res) => {
        console.log(res);
        //setCertification(res)
        res.data == true ? setNicknameTF(true) : setNicknameTF(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //변경된 닉네임 등록
  const ChangeNickname = async () => {
    await axios
      .put("http://52.44.107.157:8080/api/mypage/change", {
        nickname: inputUserNick,
      },{
        headers: {
          Authorization: `Bearer ${location.state.token}`,
        }
      })
      .then((res) => {
        setUserNickname(inputUserNick);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
      />
      <div className={styles.Container}>
        <div className={styles.LeftContainer}>
          <div className={styles.Intro}>
            <CgProfile className={styles.MyIcon}  
            onClick={()=>{
              setCategoryId("");
            }}
            />
            <div className={styles.Nickname}>{userNickname}</div>
          </div>
          <br></br>
          <ul>
            <li className={styles.Writed} onClick={()=>{
              setCategoryId("bookmark");
            }}>즐겨찾기한 음식점</li>
            <li className={styles.Writed} onClick={()=>{
              setCategoryId("review");
            }}>내가 쓴 리뷰</li>
            <li className={styles.Writed} onClick={()=>{
              setCategoryId("post");
            }}>내가 쓴 게시글</li>
            <li className={styles.Writed} onClick={()=>{
              setCategoryId("comment");
            }}>내가 쓴 댓글</li>
          </ul>
        </div>

        <div className={styles.RightContainer}>
        
            <hr className={styles.Line2}></hr>
            {/* <div className={styles.ListTitle}>{categoryName}</div> */}
            <div className={styles.ListContent}>
            <div className={styles.EmailContainer}>
            <div className={styles.EmailLeft}>내 이메일</div>
            <div className={styles.EmailRight}>{userEmail}</div>
          </div>
          <hr className={styles.Line}></hr>
          <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
              <Form.Label className={styles.KwId}>Nickname</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                autoComplete="off"
                placeholder="닉네임을 입력해 주세요"
                onChange={(e) => {
                  e.preventDefault();
                  setInputUserNick(e.target.value);
                }}
              />
              <Button
                className={styles.Btn}
                variant="primary"
                onClick={Nickname}
                style={{
                  backgroundColor: inputUserNick.length == 0 && "#06A77D",
                  color: inputUserNick.length == 0 && "white",
                }}
                disabled={inputUserNick.length == 0 ? true : false}
              >
                중복 확인
              </Button>
              <Button
                className={styles.Btn}
                variant="primary"
                onClick={ChangeNickname}
                style={{
                  backgroundColor:
                    nicknameTF ? null : "#06A77D",
                  color:  nicknameTF ? null : "white",
                }}
                disabled={ nicknameTF  ? false : true}
              >
                닉네임변경
              </Button>
            </Form.Group>
            <div className={styles.BottomTitle}>{categoryName}</div>
        { 
            //즐겨찾기한 음식점
            categoryId === "bookmark" ?
            userlist.map((a,i)=>{
              return(<div>{a.storeName}</div>)
            }):
            //내가 쓴 리뷰
            categoryId === "review" ?
            userlist.map((a,i)=>{
              return(<div>{a.contents}</div>)
            }):
            //내가 쓴 게시글  
            categoryId === "post" ?
            userlist.map((a,i)=>{
              return(
              <div className={styles.CommentLine}>
                <hr className={styles.CommentCLine}></hr>
                <div className={styles.CommentHeader}>
                <div className={styles.NicknameSecond}>{a.category}</div> 
                <div className={styles.CommentDate}>{a.date}</div>
                </div>
                <div className={styles.CommentContent}>{a.contents}</div>
                </div>)
            }):
            //내가 쓴 댓글
            categoryId === "comment" ?
            userlist.map((a,i)=>{
              return(<div>
                <div className={styles.CommentLine}>
                <hr className={styles.CommentCLine}></hr>
                <div className={styles.CommentHeader}>
                <div className={styles.NicknameSecond}>{userNickname}</div> 
                <div className={styles.CommentDate}>{a.date}</div>
                </div>
                <div className={styles.CommentContent}>{a.contents}</div>
                </div></div>)
            }):
            console.log("오류")
      }
          </div>
        </div>
      </div>

    </>
  );
}
