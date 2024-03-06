import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  LoginBox,
  LoginFooter,
  LoginHeader,
  LoginMain,
  LoginPageWrap,
} from "../../../styles/loginpage/loginpagestyle";
import useCustomLogin from "../../hooks/useCustomLogin";
import { ValidateErrorEntity } from "rc-field-form/es/interface";

export interface LoginRes {
  code: string;
  data: {
    nm: string;
    result: number;
    accessToken: string;
  };
  message: string;
}
export interface LoginParam {
  uid: string;
  upw: string;
}
const LoginPage = () => {
  const { doLogin } = useCustomLogin();
  const navigate = useNavigate();
  const successFn = (result: LoginRes) => {
    // console.log(result);
    successAl("로그인 성공");
    navigate("/admin");
  };
  const failFn = (err: string) => {
    console.log(err);
    errorAl("로그인 실패");
  };
  const errorFn = (err: string) => {
    console.log(err);
    errorAl("로그인 실패");
  };
  // 초기값
  const initState: LoginParam = {
    uid: "",
    upw: "",
  };
  const [loginParam, setLoginParam] = useState(initState);
  const [messageApi, contextHolder] = message.useMessage();

  // 커스텀 훅 사용하기
  const onFinish = () => {
    // console.log("Success:", values);
    // successAl("로그인 성공");
    doLogin({ loginParam, successFn, failFn, errorFn });
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity<any>) => {
    errorAl("로그인 실패");
    console.log("Failed:", errorInfo);
  };
  const onValuesChanged = (changedValues: any, allValues: any) => {
    setLoginParam({ ...allValues });
  };

  // 알람 관련
  const successAl = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };

  const errorAl = (txt: string) => {
    messageApi.open({
      type: "error",
      content: txt,
    });
  };
  return (
    <LoginPageWrap>
      <LoginHeader />
      {contextHolder}
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
  );
};
export default LoginPage;
