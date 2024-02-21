import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

export interface LoginParams {
  uid: string;
  upw: string;
}

const LoginPage: React.FC = () => {
  const initState: LoginParams = {
    uid: "",
    upw: "",
  };

  const [loginParam, setLoginParam] = useState<LoginParams>(initState);
  const { doLogin } = useCustomLogin();

const onFinish = async (loginParam: LoginParams) => {
  try {
    const successFn = (data: any) => {
      // 로그인 성공 시 처리할 내용
    };
    const failFn = (error: string) => {
      // 로그인 실패 시 처리할 내용
      console.error(error);
    };

    const errorFn = (error: string) => {
      // 로그인 에러 시 처리할 내용
      console.error("Error in login:", error);
    };

    await doLogin({ loginParam, successFn, failFn, errorFn });
  } catch (error) {
    console.error("Error in login:", error);
  }
};

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChanged = (
    changedValues: Partial<LoginParams>,
    allValues: LoginParams,
  ) => {
    setLoginParam({ ...allValues, ...changedValues });
  };

  return (
    <Form
      style={{
        width: "540px",
        maxWidth: 800,
        height: "252px",
        margin: "0 auto 74px auto",
      }}
      initialValues={{
        remember: true,
        uid: loginParam.uid,
        upw: loginParam.upw,
      }}
      onValuesChange={onValuesChanged}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="uid"
        label={<label style={{ color: "#E9B25F", fontSize: "20px" }}>ID</label>}
        rules={[
          {
            required: true,
            message: "아이디를 입력해주세요!",
            whitespace: true,
          },
        ]}
        style={{ height: "80px" }}
      >
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
      <Form.Item
        name="upw"
        label={<label style={{ color: "#E9B25F", fontSize: "20px" }}>PW</label>}
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요!",
          },
        ]}
        style={{ height: "80px" }}
      >
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
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "540px",
            height: "60px",
            background: "#E9B25F",
            fontSize: "25px",
          }}
        >
          로그인
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
