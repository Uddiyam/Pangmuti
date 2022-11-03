import React from "react";
import Header from "./Header";
import styles from "./styles/GeneralForum.module.css";

export default function GeneralForum() {
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
        <tr>
          <td><input className={styles.register_content} type="text"></input></td>
          <td><button className={styles.register_button}>등록 </button></td>
          </tr>
      </table>

      <table className={styles.show_content}>
        <tbody>
        <tr>
          <td colsapn="1">추천합니다</td>
          <td colspan="1">게시글 내용</td>
          <td colspan="1"></td>
          <td colspan="1">작성자</td>
          <td colspan="1">날짜</td>
          </tr>
          </tbody>
      </table>
    </>
  );
}
