import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {Link, useNavigate, Navigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
/*
Local Storage vs Session Storage🤼‍♂️

둘다 웹 브라우저가 제공하는 데이터 저장소이다.🛢 보통 약 5 MB정도의 데이터를 저장할 수 있고 자바스크립트로 직접 접근해 데이터를 저장, 읽기,제거(getItem,setItem,removeItem)를 할 수 있다.
단 둘의 차이가 있다면 데이터 저장 유지 기간이다.

Local storage👴: 영구적 데이터 저장소, 사용자가 일부러 브라우저 정보를 삭제하지 않는 이상 계속 유지가 된다. 특정도메인에서 저장한 데이터는 다른 도메인과 공유하지 않는다.
session storage🎈: 세션이 유지되는 동안에만 유요한 저장소 (여기서 세션 유지란, 브라우저가 닫히거나 종료되는 것) 같은 도메인내에 모든 페이지에서 데이터 공유함.
따라서 토큰값을 session storage에 저장을 하면 브라우저가 닫히는 순간 토큰이 날라가게되서 새로운 창을 열면 다시 로그인을 해야한다. 이와같은 단점을 보안하기위해 refresh token이라는 개념이 있다.♻ refresh token은 로컬스토리지에 저장을해서 브라우저가 닫히더라고 이 refresh token을 이용해 다시 로그인 필요없이 토큰을 재발행 할 수 있는 로직이다. 이로직은 이 코스에서 다루진 않지만 관심있는 친구들이라면 한번 공부해보는 것을 추천한다!
 */
const LoginPage = ({user, setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/user/login', {email, password});
      console.log("response =", response);

      if (response.status === 200) {
        console.log("성공");
        setUser(response.data.user);
        //세션 스토리지에 token 저장
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setError("");
        navigate('/');
      } else {
        // 로그인 실패
        throw new Error(response.data.error);
      }

    } catch (error) {
      setError(error.message);
    }
  }

  if (user) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event => setEmail(event.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event => setPassword(event.target.value))}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
