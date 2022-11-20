import React from "react";
import Header from "./Header";
import styles from "./styles/Mypage.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './post/postSlice';


export default function Mypage() {
  let a = useSelector((state) => { return state.user })
  return (
    <>
      <Header />
      {
        a.map((s, i) => {
          return (
            <div>
              <table className={styles.show_content}>
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
          )
        })
      }
    </>
  );
}
