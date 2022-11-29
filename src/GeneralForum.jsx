import React from "react";
import Header from "./Header";
import styles from "./styles/GeneralForum.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { addItem } from './post/postSlice';

export default function GeneralForum() {
  let dispatch = useDispatch();
  let a = useSelector((state) => { return state.user})
  let navigate = useNavigate()
  return (
    <>
      <Header />
      <input className={styles.search} type="search"></input>
      <div className={styles.categories}>
      <div>전체</div>
      <div>| 추천합니다</div>
      <div>| 추천해주세요</div>
      <div>| 같이 밥 먹을 사람</div>
      </div>
       
      <table className={styles.register_content_table}>
        <tbody>
        <tr>
          <td><input id = 'post' className={styles.register_content} type="text"></input></td>
          <td><button onClick={()=>{
            if(document.getElementById('post').value.length>0){
             dispatch(addItem({recommended:0,post_value: document.getElementById('post').value,id:'hbk', date:'20xx/xx/xx'}))
            }
            else{
              alert('내용을 입력해주세요!')
            }
            }}className={styles.register_button}>등록 </button></td>
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

      {
            a.map((s, i)=>{
              return(   
                  <table className={styles.show_content}>
                    <tbody>
                    <tr onClick={()=>{navigate('/ForumDetail/'+i)}}>
                      <td colSpan="1">{s.recommended}</td>
                      <td colSpan="1">{s.post_value}</td>
                      <td colSpan="1">{s.id}</td>
                      <td colSpan="1">{s.date}</td>
                      </tr>
                      </tbody>
                  </table>
              )
            })
          }
    </>
  );
}
