import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const checkEmail = (e) => {
    let regExp =
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})\.([a-z\.]{2,6})$/;
    // 형식에 맞는 경우 true 리턴
    setIsEmail(regExp.test(e.target.value));
  };
  return (
    <div className={styles.Container}>
      <Form className={styles.LoginForm}>
        <div className={styles.FormWrap}>
          <Form.Group className={styles.IdWrap} controlId="formBasicEmail">
            <Form.Label className={styles.Id}>ID</Form.Label>
            <Form.Control
              className={styles.Input}
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setUserEmail(e.target.value);
                checkEmail(e);
              }}
            />
            {isEmail
              ? null
              : userEmail.length > 0 && (
                  <div className={styles.FalseEmail}>
                    <CgDanger className={styles.Icon} />
                    이메일 형식 에러
                  </div>
                )}
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
            />
            <div className={styles.SignUp}>
              <Link to="/SignUp" className={styles.LinkSignUp}>
                회원가입
              </Link>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button className={styles.Btn} variant="primary" type="submit">
            <Link to="/Main" className={styles.Link}>
              로그인
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
