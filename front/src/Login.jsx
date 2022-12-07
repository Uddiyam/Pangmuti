import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const checkEmail = (e) => {
    let regExp =
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})\.([a-z\.]{2,6})$/;
    // 형식에 맞는 경우 true 리턴
    setIsEmail(regExp.test(e.target.value));
  };
  console.log(`${userEmail}@kw.ac.kr`);
  const SendData = () => {
    axios
      .post("http://52.44.107.157:8080/api/user/login", {
        email: `${userEmail}@kw.ac.kr`,
        password: userPassword,
      })
      .then((res) => {
        console.log(res);
        //setCertification(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.Container}>
      <Form className={styles.LoginForm}>
        <div className={styles.FormWrap}>
          <h2 className={styles.Logo}>팡뮤티에 오신걸 환영합니다</h2>
          <Form.Group className={styles.IdWrap} controlId="formBasicEmail">
            <Form.Label className={styles.Id}>ID</Form.Label>
            <InputGroup className={styles.InputIDWrap}>
              <Form.Control
                className={styles.InputID}
                type="email"
                placeholder="아이디를 입력해 주세요"
                autoComplete="off"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  checkEmail(e);
                }}
              />
              <InputGroup.Text id="basic-addon2" className={styles.Default}>
                <span className={styles.DefaultText}>@kw.ac.kr</span>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group
            className={styles.PasswordWrap}
            controlId="formBasicPassword"
          >
            <Form.Label className={styles.Password}>Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              autoComplete="off"
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <div className={styles.SignUp}>
              <Link to="/SignUp" className={styles.LinkSignUp}>
                회원가입
              </Link>
            </div>
          </Form.Group>
          <Button className={styles.Btn} variant="primary" onClick={SendData}>
            <Link to="/Main" className={styles.Link}>
              로그인
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
