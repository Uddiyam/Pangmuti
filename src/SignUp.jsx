import React from "react";
import styles from "./styles/SignUp.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

export default function SignUp() {
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
              @kw.ac.kr
            </InputGroup.Text>
          </InputGroup>

          <Button className={styles.Btn} variant="primary" type="submit">
            인증하기
          </Button>
        </Form.Group>

        <Form.Group className={styles.KwIdWrap} controlId="formBasicEmail">
          <Form.Label className={styles.KwId}>인증번호 입력</Form.Label>
          <Form.Control
            className={styles.Input}
            type="text"
            pattern="[0-9]*"
            autoComplete="off"
            placeholder="인증번호를 입력해 주세요"
          />
          <Button className={styles.Btn} variant="primary">
            인증 확인
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
