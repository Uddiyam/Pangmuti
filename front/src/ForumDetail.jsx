import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from './post/postSlice';
import Header from "./Header";
import styles from "./styles/ForumDetail.module.css";
import { useState } from "react";
import { useEffect } from "react";


export default function ForumDetail() {
  let {id} = useParams();
  let a = useSelector((state) => { return state.user})
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let commentlist={};
  let [comment, 수정] = useState(commentlist);

  console.log(a[id])
  return (
    <>
      <Header />
      <input className={styles.search} type="search"></input>
      <div className={styles.DetailTop}>
      <div className={styles.Nickname} >{a[id].id}</div>
      <div className={styles.Date}>{a[id].date}</div>
      <a className={styles.Delete} onClick={()=>{
        dispatch(deleteItem(a[id]));
        navigate("/Forum");
      }}>삭제</a>
      </div>
      <hr className={styles.Line}></hr>
      <div className={styles.Title}>글</div>
      <div className={styles.Post} >{a[id].post_value}</div>

      <table className={styles.RegisterContentTable}>
        <tbody>
          <tr>
           <td><input id = 'comment' className={styles.RegisterContent} type="text"></input></td>
            <td><button onClick={()=>{
             if(document.getElementById('comment').value.length>0){
                수정([document.getElementById('comment').value, ...comment]);
                console.log(comment)
              }
              else{
                alert('내용을 입력해주세요!')
              }
            }}className={styles.register_button}>등록 </button></td>
          </tr>
          </tbody>
      </table>
      {
        comment.map((s,i)=>{
          return(
            <div className={styles.ShowComment}>{s}</div>
          )
        })
      }
    </>
  );
}
