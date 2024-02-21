import { Button, Form, GetRef, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Common,
  MainTitle,
  MiddleButton,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SmallButton,
  SubTitle,
} from "../../styles/AdminBasic";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

// 이게뭘까
interface EditableRowProps {
  index: number;
}

const Aaa = styled(Table)`
  :where(.css-dev-only-do-not-override-17sses9).ant-table-wrapper
    .ant-table-tbody
    .ant-table-row.ant-table-row-selected
    > .ant-table-cell {
    background-color: ${Common.color.p800};
  }
  .ant-checkbox-input {
    background-color: ${Common.color.p800};
  }
`;
const MainBanner: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  interface IDataItem {
    key: number;
    img: JSX.Element;
    picupbt: JSX.Element;
    urllink: JSX.Element;
    target: JSX.Element;
    edbt: JSX.Element;
  }
  const columns = [
    {
      title: "순서",
      dataIndex: "key",
    },
    {
      title: "미리보기",
      dataIndex: "img",
    },
    {
      title: "사진업로드",
      dataIndex: "picupbt",
    },
    {
      title: "링크주소",
      dataIndex: "urllink",
    },
    {
      title: "TARGET",
      dataIndex: "target",
    },
    {
      title: "상태관리",
      dataIndex: "edbt",
    },
  ];

  const [uploadImgBefore, setUploadImgBefore] = useState<string | undefined>();

  const handleChangeFileOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]; // 파일이 반드시 존재한다고 가정합니다. 필요에 따라 null 체크를 추가할 수 있습니다.

    // 파일을 읽기 위한 FileReader 객체 생성
    const reader = new FileReader();

    // 파일 읽기가 완료되었을 때의 이벤트 핸들러
    reader.onloadend = () => {
      // 읽은 파일의 URL을 상태에 설정하여 이미지를 업데이트합니다.
      if (reader.readyState === FileReader.DONE) {
        setUploadImgBefore(reader.result as string | undefined);
      }
    };

    // 파일 읽기 실행
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 이미지 설정 설정
  // const defaultImgUrl = `${process.env.PUBLIC_URL}/assets/images/defaultitemimg.svg`;

  const [data, setData] = useState<IDataItem[]>(() => {
    const initialData: IDataItem[] = [];
    for (let i = 0; i < 2; i++) {
      initialData.push({
        key: i + 1,
        img: (
          <img
            style={{ width: "190px", height: "66px", objectFit: "cover" }}
            src={uploadImgBefore}
            alt=""
            className="diaryadd-img-before"
          />
        ),
        picupbt: (
          <>
            <label htmlFor="input-file-before">
              <SmallButton
                style={{ width: "100px", height: "30px" }}
                type="button"
                onClick={() => {
                  const inputFile = document.getElementById(
                    "input-file-before",
                  ) as HTMLInputElement;
                  if (inputFile) {
                    inputFile.click();
                  }
                }}
                className="diaryadd-img-input-button-before"
              >
                파일 선택
              </SmallButton>
            </label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleChangeFileOne}
              id="input-file-before"
              style={{ display: "none" }}
            />
          </>
        ),
        urllink: (
          <>
            <MiddleInput></MiddleInput>
          </>
        ),
        target: (
          <>
            <SelectStyle>
              <option>현재창</option>
              <option>새창</option>
            </SelectStyle>
          </>
        ),
        edbt: (
          <>
            <SearchButton>수정</SearchButton>
            <SearchButton
              style={{
                background: "rgb(244, 67, 54)",
              }}
            >
              삭제
            </SearchButton>
          </>
        ),
      });
    }
    return initialData;
  });

  // 추가버튼 함수
  const handleAdd = () => {
    const newData: IDataItem = {
      key: data.length + 1,
      img: (
        <img
          style={{ width: "190px", height: "66px" }}
          src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDvLtp%2FbtrzdOekBQ1%2F97wPAt3knfNKwTMiZvqkpk%2Fimg.png"
          alt=""
        />
      ),
      picupbt: (
        <>
          <label htmlFor="input-file-before">
            <SmallButton
              style={{ width: "100px", height: "30px" }}
              type="button"
              onClick={() => {
                const inputFile = document.getElementById(
                  "input-file-before",
                ) as HTMLInputElement | null;
                if (inputFile) {
                  inputFile.click();
                }
              }}
              className="diaryadd-img-input-button-before"
            >
              파일 선택
            </SmallButton>
          </label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleChangeFileOne}
            id="input-file-before"
            style={{ display: "none" }}
          />
        </>
      ),
      urllink: (
        <>
          <MiddleInput></MiddleInput>
        </>
      ),
      target: (
        <>
          <SelectStyle>
            <option>현재창</option>
            <option>새창</option>
          </SelectStyle>
        </>
      ),
      edbt: (
        <>
          <SearchButton style={{ background: "#4F95FF" }}>업로드</SearchButton>
        </>
      ),
    };
    setData(prevData => [...prevData, newData]); // 이전 상태를 가져와서 새로운 데이터 추가
  };
  return (
    <>
      <MainTitle>메인 배너</MainTitle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SubTitle style={{ textAlign: "center", lineHeight: "15px" }}>
          전체 : <span style={{ color: "rgb(244, 67, 54)" }}>4</span> 건 조회 |
          순서는 숫자가 작을수록 우선 순위로 노출됩니다.
        </SubTitle>
        {/* 추가버튼 */}
        <MiddleButton
          onClick={handleAdd}
          style={{ marginBottom: 16, fontSize: "12px" }}
        >
          배너 추가
        </MiddleButton>
      </div>
      <Aaa
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};
export default MainBanner;
