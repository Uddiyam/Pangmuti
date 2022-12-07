import React from "react";
import styles from "./styles/SignUp.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [certification, setCertification] = useState();
  const [userInput, setUserInput] = useState();
  const [userNickname, setUserNickname] = useState();
  const [TF, setTF] = useState(false);
  const Confirm = () => {
    certification == userInput ? setTF(true) : setTF(false);
  };
  const SendMail = () => {
    axios
      .post("http://52.44.107.157:8080/api/user/mail", {
        email: "yjasd1234@kw.ac.kr",
      })
      .then((res) => {
        console.log(res);
        //setCertification(res)
      })
      .catch((err) => {
        console.log(err);
      });

    /*axios
      .post(
        "http://52.44.107.157:8080/api/post/create",
        {
          contents: "hi",
          categoryId: 3,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxdkJlY0Y4b29CaTdPcGkxZHFBSEgiLCJyb2xlIjoi7J2867CYIOyCrOyaqeyekCIsImV4cCI6MTY3Mjk0NDk1OH0._iIXYR1vpFXcfhjYFjAlyVadZIKm011e0vlsvr14RRM",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));*/
  };

  const Nickname = () => {
    axios
      .post("http://52.44.107.157:8080/api/user/check", {
        nickname: userNickname,
      })
      .then((res) => {
        console.log(res);
        //setCertification(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignUp = () => {
    axios
      .post("http://52.44.107.157:8080/api/user/signup", {
        email: "",
        password: userInput,
        nickname: userNickname,
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
      <Form className={styles.SignWrap}>
        <div className={styles.Logo}>팡뮤티 회원가입</div>

        <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
          <Form.Label className={styles.KwId}>광운대학생 인증</Form.Label>

          <InputGroup className={styles.InputID}>
            <Form.Control
              className={styles.InputEmail}
              placeholder="Enter email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              autoComplete="off"
            />
            <InputGroup.Text id="basic-addon2" className={styles.Default}>
              <span className={styles.DefaultText}>@kw.ac.kr</span>
            </InputGroup.Text>
          </InputGroup>

          <Button className={styles.Btn} variant="primary" onClick={SendMail}>
            인증하기
          </Button>
        </Form.Group>
        {console.log(userInput)}
        <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
          <Form.Label className={styles.KwId}>인증번호 입력</Form.Label>
          <Form.Control
            className={styles.Input}
            type="number"
            pattern="[0-9]*"
            autoComplete="off"
            placeholder="인증번호를 입력해 주세요"
            onChange={(e) => {
              e.preventDefault();
              setUserInput(e.target.value);
            }}
          />
          <Button className={styles.Btn} variant="primary" onClick={Confirm}>
            인증 확인
          </Button>
        </Form.Group>
      </Form>
      {TF == false && (
        <>
          <hr style={{ marginTop: "4%" }} />
          <Form className={styles.SignWrap}>
            <Form.Group
              className={styles.KwPasswordWrap}
              controlId="formBasicEmail"
            >
              <Form.Label className={styles.KwId}>Password</Form.Label>

              <Form.Control
                className={styles.InputPassword}
                placeholder="비밀번호를 입력해 주세요"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
              <Form.Label className={styles.KwId}>Password 확인</Form.Label>
              <Form.Control
                className={styles.InputPassword}
                type="number"
                pattern="[0-9]*"
                autoComplete="off"
                placeholder="비밀번호를 다시 입력해 주세요"
                onChange={(e) => {
                  e.preventDefault();
                  setUserInput(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
              <Form.Label className={styles.KwId}>Nickname</Form.Label>
              <Form.Control
                className={styles.Input}
                type="number"
                pattern="[0-9]*"
                autoComplete="off"
                placeholder="닉네임을 입력해 주세요"
                onChange={(e) => {
                  e.preventDefault();
                  setUserNickname(e.target.value);
                }}
              />
              <Button
                className={styles.Btn}
                variant="primary"
                onClick={Nickname}
              >
                중복 확인
              </Button>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button
                className={styles.ResBtn}
                variant="primary"
                onClick={SignUp}
              >
                가입
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
