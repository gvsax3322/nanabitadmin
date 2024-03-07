import { Checkbox, ConfigProvider, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  deletBanner,
  getBanner,
  patchBanner,
  postBanner,
} from "../../api/usermain/mainbannerApi";
import {
  MainTitle,
  MiddleButton,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SmallButton,
  SubTitle,
} from "../../styles/AdminBasic";
import { API_SERVER_HOST } from "../../util/util";
// 테이블 스타일 관리

// 배너
export interface BannerData {
  ibanner: number;
  target: number;
  status: number; // 노출여부
  bannerUrl: string;
  bannerPic: string;
  bannerNew: number;
  bannerlength: number;
}

export interface PostBannerData {
  pic: string;
  dto: {
    bannerUrl: string;
    target: number;
    status: number;
  };
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
  const [refresh, setRefresh] = useState<number>(0);

  // 보낼 데이터
  const [bannerImg, setBannerImg] = useState<string>();
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [bannerTarget, setBannerTarget] = useState<number>(0);
  const [bannerState, setBanenrState] = useState<number | null>(null);

  const [messageApi, contextHolder] = message.useMessage();
  const successEvent = (txt: string) => {
    messageApi.open({
      type: "success",
      content: txt,
    });
  };
  const warningEvent = (txt: string) => {
    messageApi.open({
      type: "warning",
      content: txt,
    });
  };

  const fetchData = async () => {
    try {
      await getBanner(successFn, failFn, errorFn);
    } catch (error) {}
  };

  const successFn = (data: BannerData[]) => {
    const arr = data.map((item, index) => {
      item.bannerNew = 0;
      item.bannerlength = index;
      return item;
    });
    setBannerInfo(arr);
  };
  const failFn = (error: string) => {
    console.error("목록 호출 오류:", error);
  };
  const errorFn = (error: string) => {
    console.error("목록 호출 서버 에러:", error);
  };

  const dataSource = bannerInfo
    ? bannerInfo.map((item, index) => ({
        item: item,
        key: index + 1,
        ibanner: item.ibanner,
        target: item.target,
        status: item.status,
        bannerUrl: item.bannerUrl,
        bannerPic: item.bannerPic
          ? `${API_SERVER_HOST}/pic/banner/${item.ibanner}/${item.bannerPic}`
          : process.env.PUBLIC_URL + "/assets/images/defaultitemimg.svg",
        bannerNew: item.bannerNew,
        bannerlength: item.bannerlength,
      }))
    : [];

  // 배너 추가 함수
  const handleAdd = () => {
    const newBannerInfo = bannerInfo || [];

    // bannerlength가 999인 데이터가 있는지 확인
    const hasBannerLength999 = newBannerInfo.some(
      item => item.bannerlength === 999,
    );
    if (hasBannerLength999) {
      warningEvent("배너는 하나씩 추가할 수 있습니다.");
      return;
    }

    let newIbanner;
    if (newBannerInfo.length > 0) {
      newIbanner = newBannerInfo.length + 1;
      successEvent("배너 정보를 입력해 주세요.");
    } else {
      newIbanner = 1; // 만약 bannerInfo가 null이거나 길이가 0이면 1로 설정
    }
    const newData = {
      ibanner: newIbanner,
      target: 0,
      status: 0, // 노출여부
      bannerUrl: "",
      bannerPic: "",
      bannerNew: 1, // 새로운 이미지
      bannerlength: 999,
    };

    setBannerInfo([...newBannerInfo, newData]);
  };
  //  =================배너 값 관리 함수 =================
  // 체크여부
  const handleCheckChange = (item: any, isChecked: boolean) => {
    // console.log(`item: ${item}, 변경된 체크 여부: ${isChecked}`);
    console.log(item);
    if (isChecked === false) {
      console.log("배너 상태 :", item.status);
      setBanenrState(1);
    } else if (isChecked === true) {
      console.log("배너 상태 :", item.status);
      setBanenrState(0);
    }
    console.log("useState", bannerState);
  };

  // url 입력창
  const handleInputChange = (value: string) => {
    // console.log("입력값:", value);
    setBannerUrl(value);
  };

  const handleTargetChange = (value: number, ibanner: number) => {
    console.log("ibanner : ", ibanner, "타겟 :", value);
    setBannerTarget(value);
  };

  // 이미지
  const logImageInfo = async (ibanner: any, imageData: string) => {
    await setBannerImg(imageData);

    // console.log(imageData);
    // console.log("잘 나오고 있나요 ?", bannerImg);
  };
  // 상태관리 버튼
  const handleState = async (action: string, ibanner: any) => {
    if (action === "editbanner") {
      // 수정 버튼이 클릭된 경우
      console.log("ibanner", ibanner);
      console.log("사진", ibanner.bannerPic);
      console.log("url", ibanner.bannerUrl);
      console.log("타겟", ibanner.target);
      console.log("체크여부", ibanner.status);
      function convertToPostBannerData(data: any): PostBannerData {
        const postBannerData: PostBannerData = {
          pic: bannerImg || ibanner.bannerPic, // 기본값은 빈 문자열로 설정
          dto: {
            bannerUrl: bannerUrl || ibanner.bannerUrl, // 기본값은 빈 문자열로 설정
            target: bannerTarget || ibanner.target, // 기본값은 0으로 설정
            status: bannerState || ibanner.status, // 기본값은 0으로 설정
          },
        };
        return postBannerData;
      }
      // 예시
      const ibannerData = {
        bannerNew: ibanner.bannerNew,
        bannerPic: ibanner.bannerPic,
        bannerUrl: ibanner.bannerUrl,
        ibanner: ibanner.ibanner,
        key: ibanner.key,
        status: ibanner.status,
        target: ibanner.target,
      };

      const letsPostBanner: PostBannerData =
        convertToPostBannerData(ibannerData);
      console.log(letsPostBanner);
      patchBanner(ibanner.ibanner, letsPostBanner);
      fetchData();
      setRefresh(refresh + 1);
      successEvent(`수정 되었습니다.`);
      setBannerImg("");
      setBanenrState(0);
      setBannerUrl("");
      setBannerImg("");
      setBannerTarget(0);
      // ==============================================
    } else if (action === "deletebanner") {
      // 삭제 버튼이 클릭된 경우
      deletBanner(ibanner);
      fetchData();
      setRefresh(refresh + 1);
      successEvent(`삭제 되었습니다.`);
      // console.log("삭제 버튼", "ibanner:", ibanner);
      // ==============================================
    } else if (action === "uploadbanner") {
      // 업로드 버튼이 클릭된 경우
      const splitBannerPic = ibanner.bannerPic.split("/");
      const findImgNull = splitBannerPic[4];
      console.log(findImgNull);
      console.log("bannerImg", bannerImg);
      if (bannerImg === undefined) {
        warningEvent("이미지를 추가해 주세요.");
      } else if (bannerImg !== undefined) {
        function convertToPostBannerData(data: any): PostBannerData {
          const postBannerData: PostBannerData = {
            pic: bannerImg || "", // 기본값은 빈 문자열로 설정
            dto: {
              bannerUrl: bannerUrl || "", // 기본값은 빈 문자열로 설정
              target: bannerTarget || 0, // 기본값은 0으로 설정
              status: bannerState || 0, // 기본값은 0으로 설정
            },
          };
          return postBannerData;
        }
        // 예시
        const ibannerData = {
          bannerNew: ibanner.bannerNew,
          bannerPic: ibanner.bannerPic,
          bannerUrl: ibanner.bannerUrl,
          ibanner: ibanner.ibanner,
          key: ibanner.key,
          status: ibanner.status,
          target: ibanner.target,
        };

        const letsPostBanner: PostBannerData =
          convertToPostBannerData(ibannerData);
        console.log(letsPostBanner);
        console.log("업로드 후!", bannerState);
        postBanner(letsPostBanner);
        fetchData();
        successEvent(`업로드 되었습니다.`);
        setRefresh(refresh + 1);
        setBannerImg("");
        setBanenrState(0);
        setBannerUrl("");
        setBannerImg("");
        setBannerTarget(0);
      }
    }
  };

  //  =================배너 값 관리 함수 =================

  const columns: any = [
    {
      title: "노출",
      dataIndex: "item",
      key: "item",
      render: (item: any, record: any) => (
        <div>
          {/* status가 0일때 true 아니면 false를 ...? */}
          <Checkbox
            defaultChecked={record.status === 0 ? true : false}
            onChange={e => handleCheckChange(record, e.target.checked)}
          />
        </div>
      ),
    },
    {
      title: "순서",
      dataIndex: "key",
      key: "ibanner",
      render: (key: number) => <p>{key}</p>,
    },
    {
      title: "미리보기",
      dataIndex: "item",
      key: "item",
      render: (item: any): any => (
        <>
          {item.bannerPic === "" ? (
            <img
              style={{ width: "190px", height: "66px", objectFit: "cover" }}
              src={process.env.PUBLIC_URL + "/assets/images/defaultitemimg.svg"}
              id={`image-${item.ibanner}`}
              alt="upload"
            />
          ) : (
            <img
              style={{ width: "190px", height: "66px", objectFit: "cover" }}
              src={`${API_SERVER_HOST}/pic/banner/${item.ibanner}/${item.bannerPic}`}
              alt="upload"
              id={`image-${item.ibanner}`}
              className="diaryadd-img-before"
            />
          )}
        </>
      ),
    },
    {
      title: "사진업로드",
      dataIndex: "item",
      key: "ibanner",
      render: (item: any) => (
        <>
          <label htmlFor={`input-file-before-${item.ibanner}`}>
            <SmallButton
              style={{ width: "100px", height: "30px" }}
              type="button"
              onClick={() => {
                const inputFile = document.getElementById(
                  `input-file-before-${item.ibanner}`,
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
            id={`input-file-before-${item.ibanner}`}
            style={{ display: "none" }}
            onChange={event => {
              const input = event.target as HTMLInputElement;
              const file = input.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                  const imgElement = document.getElementById(
                    `image-${item.ibanner}`,
                  ) as HTMLImageElement;
                  if (imgElement) {
                    imgElement.src = reader.result as string;
                    logImageInfo(item.ibanner, reader.result as string); // 이미지 정보를 콘솔에 출력하는 함수 호출
                  }
                };
                reader.readAsDataURL(file);
                console.log(file);
              }
            }}
          />
        </>
      ),
    },
    {
      title: "링크주소",
      dataIndex: "bannerUrl",
      key: "bannerUrl",
      render: (bannerUrl: string, record: any) => (
        <>
          <MiddleInput
            defaultValue={bannerUrl}
            onChange={e => handleInputChange(e.target.value)}
          />
        </>
      ),
    },
    {
      title: "TARGET",
      dataIndex: "target",
      key: "target",
      render: (target: number, record: any) => (
        <>
          <SelectStyle
            defaultValue={target}
            onChange={e =>
              handleTargetChange(parseInt(e.target.value), record.ibanner)
            }
          >
            <option value={0}>현재창</option>
            <option value={1}>새창</option>
          </SelectStyle>
        </>
      ),
    },
    {
      title: "상태관리",
      dataIndex: "item",
      key: "item",
      render: (item: any, record: any) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <>
            {record.bannerNew === 1 ? (
              <SearchButton onClick={() => handleState("uploadbanner", record)}>
                업로드
              </SearchButton>
            ) : (
              <>
                <SearchButton onClick={() => handleState("editbanner", record)}>
                  수정
                </SearchButton>
                <SearchButton
                  onClick={() => handleState("deletebanner", record.ibanner)}
                  style={{ background: "#f44336" }}
                >
                  삭제
                </SearchButton>
              </>
            )}
          </>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <>
      {contextHolder}
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
          {/* <fetching /> */}
        </SubTitle>
        <MiddleButton
          style={{ marginBottom: 16, fontSize: "12px" }}
          onClick={handleAdd}
        >
          배너 생성
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
          dataSource={dataSource}
          pagination={false}
          bordered
        />
      </ConfigProvider>
    </>
  );
};
export default MainBanner;
