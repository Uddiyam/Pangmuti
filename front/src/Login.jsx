import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CgDanger } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Login() {
  let navigate = useNavigate();

  const [userPassword, setUserPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const [Error, setError] = useState(false);
  const handleClose = () => setError(false);

  const SendData = async () => {
    await axios
      .post("http://52.44.107.157:8080/api/user/login", {
        email: `${inputEmail}@kw.ac.kr`,
        password: userPassword,
      })
      .then((res) => {
        console.log(res);

        navigate("/Main", {
          state: {
            email: res.data.email,
            nickname: res.data.nickname,
            token: res.data.token,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
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
                  setInputEmail(e.target.value);
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
          <Button
            className={styles.Btn}
            style={{
              backgroundColor:
                (inputEmail.length == 0 || userPassword.length == 0) &&
                "#06A77D",
              color:
                (inputEmail.length == 0 || userPassword.length == 0) && "black",
            }}
            variant="primary"
            onClick={SendData}
            disabled={
              inputEmail.length > 0 && userPassword.length > 0 ? false : true
            }
          >
            로그인
          </Button>
        </div>
      </Form>
      <Modal show={Error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>아이디 또는 비밀번호를 다시 입력해 주세요</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
