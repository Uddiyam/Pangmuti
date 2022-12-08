import React from "react";
import Header from "./Header";
import styles from "./styles/Mypage.module.css";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Mypage() {
  let location = useLocation();
  console.log(location.state);

  let a = useSelector((state) => {
    return state.user;
  });
  return (
    <>
      <Header
        email={location.state.email}
        nickname={location.state.nickname}
        token={location.state.token}
      />
      <div className={styles.Intro}>
        <CgProfile className={styles.MyIcon} />
        <div className={styles.Nickname}>닉네임</div>
      </div>
      <br></br>
      <div className={styles.FavoriteRestaurant}>
        <div>즐겨찾기한 음식점</div>
      </div>
      <div className={styles.Writed}>
        <div>내가 쓴 게시글</div>
      </div>
      {a.map((s, i) => {
        if (i > 0) {
          return (
            <div>
              <table className={styles.ShowContent}>
                <tbody>
                  <tr>
                    <td colSpan="1">{s.recommended}</td>
                    <td colSpan="1">{s.post_value}</td>
                    <td colSpan="1">{s.id}</td>
                    <td colSpan="1">{s.date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      })}
    </>
  );
}
