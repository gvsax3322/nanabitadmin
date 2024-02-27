import { Checkbox, ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MainTitle,
  MiddleButton,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SmallButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { getBanner } from "../../api/usermain/mainbannerApi";
// 테이블 스타일 관리

// 배너
export interface BannerData {
  ibanner: number;
  target: number;
  status: number; // 노출여부
  bannerUrl: "string";
  bannerPic: "string";
}

const CenteredHeaderTable = styled(Table)`
  &&& {
    .ant-table-thead > tr > th {
      text-align: center;
    }
    .ant-table-tbody > tr > td {
      text-align: center;
    }
  }
`;
const MainBanner: React.FC = () => {
  const [bannerInfo, setBannerInfo] = useState<BannerData[] | null>(null);

  const fetchData = async () => {
    try {
      const successFn = (data: BannerData[]) => {
        setBannerInfo(data);
      };
      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };
      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };
      await getBanner(successFn, failFn, errorFn);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    console.log("잘 나오고 있나요 ?", bannerInfo);
  }, []);

  interface IDataItem {
    exposing: JSX.Element;
    ibanner: number;
    bannerPic?: JSX.Element;
    picupbt: JSX.Element;
    bannerUrl: JSX.Element;
    target: JSX.Element;
    edbt: JSX.Element;
  }
  const columns = [
    {
      title: "노출",
      dataIndex: "exposing",
    },
    {
      title: "순서",
      dataIndex: "ibanner",
    },
    {
      title: "미리보기",
      dataIndex: "bannerPic",
    },
    {
      title: "사진업로드",
      dataIndex: "picupbt",
    },
    {
      title: "링크주소",
      dataIndex: "bannerUrl",
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
  useEffect(() => {
    // uploadImgBefore 값이 변경될 때마다 data 상태를 업데이트합니다.
    setData(prevData => {
      // 기존 데이터를 복사하여 업데이트합니다.
      const updatedData = [...prevData];
      // uploadImgBefore 값을 새로운 값으로 업데이트합니다.
      updatedData.forEach(item => {
        item.bannerPic = (
          <>
            <img
              style={{
                width: "190px",
                height: "66px",
                objectFit: "cover",
              }}
              src={uploadImgBefore}
              alt=""
              className="diaryadd-img-before"
            />
          </>
        );
      });
      return updatedData;
    });
  }, [uploadImgBefore]);
  const handleChangeFileOne = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files![0]; // 파일이 반드시 존재한다고 가정합니다. 필요에 따라 null 체크를 추가할 수 있습니다.
    // 파일을 읽기 위한 FileReader 객체 생성
    const reader = new FileReader();
    // 파일 읽기가 완료되었을 때의 이벤트 핸들러
    reader.onloadend = () => {
      // 읽은 파일의 URL을 상태에 설정하여 이미지를 업데이트합니다.
      if (reader.readyState === FileReader.DONE) {
        const imgStr = reader.result as string | undefined;
        setData(prevData => {
          const updatedData = [...prevData];
          updatedData[index].bannerPic = (
            <>
              <img
                style={{
                  width: "190px",
                  height: "66px",
                  objectFit: "cover",
                }}
                src={imgStr}
                alt=""
                className="diaryadd-img-before"
              />
            </>
          );
          return updatedData;
        });
      }
    };
    // 파일을 읽습니다.
    reader.readAsDataURL(file);
  };
  const defaultImgUrl = `${process.env.PUBLIC_URL}/assets/images/defaultitemimg.svg`;
  // map 돌릴 리스트
  const [data, setData] = useState<IDataItem[]>(() => {
    const initialData: IDataItem[] = [];
    for (let i = 0; i < 2; i++) {
      initialData.push({
        exposing: (
          <div>
            <Checkbox />
          </div>
        ),
        ibanner: i + 1,
        bannerPic: (
          <>
            <img
              style={{ width: "190px", height: "66px", objectFit: "cover" }}
              src={defaultImgUrl}
              alt=""
              className="diaryadd-img-before"
            />
          </>
        ),
        picupbt: (
          <>
            {/* <p>나는 i값 {i}</p> */}
            <label htmlFor={`input-file-before-${i}`}>
              <SmallButton
                style={{ width: "100px", height: "30px" }}
                type="button"
                onClick={() => {
                  const inputFile = document.getElementById(
                    `input-file-before-${i}`,
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
              onChange={e => handleChangeFileOne(e, i)}
              id={`input-file-before-${i}`}
              style={{ display: "none" }}
            />
          </>
        ),
        bannerUrl: (
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
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <SearchButton>수정</SearchButton>
            <SearchButton
              style={{
                background: "rgb(244, 67, 54)",
              }}
            >
              삭제
            </SearchButton>
          </div>
        ),
      });
    }
    return initialData;
  });
  // 추가버튼 함수
  const handleAdd = () => {
    const newData: IDataItem = {
      exposing: (
        <div>
          <Checkbox />
        </div>
      ),
      ibanner: data.length + 1,
      bannerPic: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 나는 i값 {data.length + 1} */}
          <div
            style={{
              width: "190px",
              height: "66px",
              background: "#d9d9d9",
            }}
          />
        </div>
      ),
      picupbt: (
        <>
          <label htmlFor={`input-file-before-${data.length + 1}`}>
            <SmallButton
              style={{ width: "100px", height: "30px" }}
              type="button"
              onClick={() => {
                const inputFile = document.getElementById(
                  `input-file-before-${data.length + 1}`,
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
            onChange={e => handleChangeFileOne(e, data.length)}
            id={`input-file-before-${data.length + 1}`}
            style={{ display: "none" }}
          />
        </>
      ),
      bannerUrl: (
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchButton style={{ background: "#4F95FF" }}>업로드</SearchButton>
        </div>
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#A5A5A5",
          },
          components: {
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      >
        <CenteredHeaderTable
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </ConfigProvider>
    </>
  );
};
export default MainBanner;
