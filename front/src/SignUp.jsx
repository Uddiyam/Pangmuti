import React from "react";
import styles from "./styles/SignUp.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactGA from "react-ga";

export default function SignUp() {
  ReactGA.initialize("UA-252097560-1");
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  let navigate = useNavigate();
  const [certification, setCertification] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [TF, setTF] = useState(false);
  const [nicknameTF, setNicknameTF] = useState();
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [number, setNumber] = useState();
  const [Error, setError] = useState(false);
  const handleClose = () => setError(false);
  const [passwordTF, setPasswordTF] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const Confirm = () => {
    ReactGA.event({
      category: "Button",
      action: "중복확인",
      label: "signup",
    });
    number == userInput ? setTF(true) : setTF(false);
    setError(true);
  };

  const SendMail = () => {
    ReactGA.event({
      category: "Button",
      action: "이메일인증하기",
      label: "signup",
    });
    axios
      .post("http://52.44.107.157:8080/api/user/mail", {
        email: `${userEmail}@kw.ac.kr`,
      })
      .then((res) => {
        console.log(res);

        if (res.data.status == "ERROR") setCertification(true);
        else {
          setCertification(false);
          setNumber(res.data);
        }

        setEmailCheck(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Nickname = () => {
    ReactGA.event({
      category: "Button",
      action: "닉네임중복확인",
      label: "signup",
    });
    axios
      .post("http://52.44.107.157:8080/api/user/check", {
        nickname: userNickname,
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

  const SignUp = async () => {
    ReactGA.event({
      category: "Button",
      action: "회원가입완료",
      label: "lsignup",
    });
    await axios
      .post("http://52.44.107.157:8080/api/user/signup", {
        email: `${userEmail}@kw.ac.kr`,
        password: password,
        nickname: userNickname,
      })
      .then((res) => {
        console.log(res);
        //setCertification(res)
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
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
              placeholder="이메일을 입력해 주세요"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              autoComplete="off"
              onChange={(e) => {
                e.preventDefault();
                setUserEmail(e.target.value);
                setEmailCheck(false);
              }}
            />
            <InputGroup.Text id="basic-addon2" className={styles.Default}>
              <span className={styles.DefaultText}>@kw.ac.kr</span>
            </InputGroup.Text>
          </InputGroup>

          <Button
            className={styles.Btn}
            variant="primary"
            onClick={SendMail}
            disabled={userEmail.length > 0 ? false : true}
            style={{
              backgroundColor: userEmail.length == 0 && "#06A77D",
              color: userEmail.length == 0 && "white",
            }}
          >
            인증하기
          </Button>
          <div
            className={styles.EmailCheck}
            style={{ color: certification ? "red" : "white" }}
          >
            {emailCheck &&
              (certification
                ? "이미 존재하는 아이디 입니다"
                : "사용가능한 아이디 입니다")}
          </div>
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
            readOnly={TF ? true : false}
            onChange={(e) => {
              e.preventDefault();
              setUserInput(e.target.value);
            }}
          />
          {userInput.length > 0 ? (
            <Button className={styles.Btn} variant="primary" onClick={Confirm}>
              인증 확인
            </Button>
          ) : (
            <Button
              className={styles.Btn}
              variant="primary"
              disabled
              style={{
                backgroundColor: "#06A77D",
                color: "white",
              }}
            >
              인증 확인
            </Button>
          )}
        </Form.Group>
      </Form>
      {TF ? (
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
                type="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() =>
                  password.length > 0 && password !== passwordConfirm
                    ? setPasswordTF(false)
                    : setPasswordTF(true)
                }
              />
            </Form.Group>

            <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
              <Form.Label className={styles.KwId}>Password 확인</Form.Label>
              <Form.Control
                className={styles.InputPassword}
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 다시 입력해 주세요"
                onChange={(e) => {
                  e.preventDefault();
                  setPasswordConfirm(e.target.value);
                }}
                onBlur={() =>
                  passwordConfirm.length > 0 && password !== passwordConfirm
                    ? setPasswordTF(false)
                    : setPasswordTF(true)
                }
              />
              <p
                className={styles.PasswordTF}
                style={{ color: passwordTF ? "white" : "red" }}
              >
                {passwordConfirm.length > 0 &&
                  password.length > 0 &&
                  (passwordTF
                    ? "비밀번호가 일치합니다"
                    : "비밀번호가 일치하지 않습니다")}
              </p>
            </Form.Group>
            <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
              <Form.Label className={styles.KwId}>Nickname</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
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
                style={{
                  backgroundColor: userNickname.length == 0 && "#06A77D",
                  color: userNickname.length == 0 && "white",
                }}
                disabled={userNickname.length == 0 ? true : false}
              >
                중복 확인
              </Button>
              <div
                className={styles.PasswordTF}
                style={{
                  color: nicknameTF ? "white" : "red",
                  float: "left",
                }}
              >
                {userNickname.length > 0 &&
                  (nicknameTF
                    ? "사용가능한 닉네임 입니다"
                    : "이미 사용중인 닉네임 입니다")}
              </div>
            </Form.Group>
            <br />
            <div style={{ textAlign: "center" }}>
              <Button
                className={styles.ResBtn}
                variant="primary"
                onClick={SignUp}
                style={{
                  backgroundColor:
                    emailCheck && nicknameTF && TF ? null : "#06A77D",
                  color: emailCheck && nicknameTF && TF ? null : "white",
                }}
                disabled={emailCheck && nicknameTF && TF ? false : true}
              >
                가입
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <Modal show={Error} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>인증번호를 잘못 입력하셨습니다</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              확인
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
