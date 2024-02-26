import { Button, Form, Input } from "antd";
import { useState } from "react";
import {
  LoginBox,
  LoginFooter,
  LoginHeader,
  LoginMain,
  LoginPageWrap,
} from "../../../styles/loginpage/loginpagestyle";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router";
const LoginPage = () => {
  const { doLogin } = useCustomLogin();
  const navigate = useNavigate();
  const successFn = result => {
    console.log(result);
    navigate("/admin");
  };
  const failFn = result => {
    console.log(result);
  };
  const errorFn = result => {
    console.log(result);
  };
  // 초기값
  const initState = {
    uid: "ADMIN",
    upw: "xptmxm12!@",
  };
  const [loginParam, setLoginParam] = useState(initState);
  // 커스텀 훅 사용하기
  const onFinish = values => {
    // console.log("Success:", values);
    doLogin({ loginParam, successFn, failFn, errorFn });
  };
  const onFinishFailed = errorInfo => {
    // console.log("Failed:", errorInfo);
  };
  // slice 값(state)을 읽을때        useSelector
  // slice 값(state)를 업데이트할때  useDispatch()
  const onValuesChanged = (changedValues, allValues) => {
    // console.log(_필드값);
    // console.log(_전체값);
    setLoginParam({ ...allValues });
  };
  return (
    <>
      <LoginPageWrap>
        <LoginHeader />
        <LoginMain>
          <LoginBox>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo.svg"}
              alt=""
            />
          </LoginBox>
          {/* // 전체 로그인 폼 */}
          <Form
            style={{
              width: "540px",
              maxWidth: 800,
              height: "252px",
              margin: "0  auto  74px auto",
            }}
            initialValues={{
              remember: true,
              uid: loginParam.uid,
              upw: loginParam.upw,
            }}
            onValuesChange={(changedValues, allValues) => {
              onValuesChanged(changedValues, allValues);
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            {/* 유저 아이디 style */}
            <Form.Item
              name="uid"
              label={
                <label style={{ color: "#6B6B6B", fontSize: "20px" }}>ID</label>
              }
              rules={[
                {
                  required: true,
                  message: "아이디를 입력해주세요!",
                  whitespace: true,
                },
              ]}
              style={{ height: "80px" }}
            >
              {/* 유저 아이디 인풋 스타일 */}
              <Input
                placeholder="아이디를 입력하세요."
                style={{
                  fontSize: "20px",
                  borderRadius: "0px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </Form.Item>
            {/* 유저 패스워드 style */}
            <Form.Item
              name="upw"
              label={
                <label style={{ color: "#6B6B6B", fontSize: "20px" }}>PW</label>
              }
              rules={[
                {
                  required: true,
                  message: "비밀번호를 입력해주세요!",
                },
              ]}
              style={{ height: "80px" }}
            >
              {/* 유저 패스워드 인풋 스타일 */}
              <Input.Password
                placeholder="비밀번호를 입력하세요."
                style={{
                  fontSize: "20px",
                  borderRadius: "0px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </Form.Item>
            {/* 버튼 창 길이조절 */}
            <Form.Item>
              {/* 버튼 style */}
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "540px",
                  height: "60px",
                  background: "#6B6B6B",
                  fontSize: "25px",
                }}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>
        </LoginMain>
        <LoginFooter>
          <h2>COPYRIGHT @ 나나빛 브랜드 공식몰 ALL RIGHTS RESERVED.</h2>
        </LoginFooter>
      </LoginPageWrap>
    </>
  );
};

export default LoginPage;

