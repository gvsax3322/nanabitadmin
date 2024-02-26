import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Table } from "antd";
import { useEffect, useState } from "react";
import MemberModifyMD from "../../../components/member/modal/MemberModifyMD";
import MemberSelect from "../../../components/select/MemberSelect";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SmallButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import OrderPicker from "../../../components/order/orderSlect/OrderPicker";
import PostModal from "../../../components/member/modal/PostModal";
import {
  BtList,
  ListWrap,
  ModifyButton,
  ModifyInfo,
  ModifyWrap,
} from "../../../styles/member/memberstyle";
import { getMemberList } from "../../../api/member/memberApi";

export interface ApiResponse {
  code: string;
  message: string;
  data: MemberList[];
}

export interface MemberList {
  iuser: number;
  nm: string;
  email: string;
  phoneNumber: string;
  registeredAt: string;
}
const MemberModify = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberList | null>(null);
  const [memberList, setMemberList] = useState<MemberList[]>([]);

  const fetchData = async () => {
    try {
      const successFn = (data: MemberList[]) => {
        // 데이터를 성공적으로 받았을 때 수행할 작업을 여기에 추가합니다.
        console.log("데이터:", data);
        setMemberList(data);
      };

      const failFn = (error: string) => {
        console.error("목록 호출 오류:", error);
      };

      const errorFn = (error: string) => {
        console.error("목록 호출 서버 에러:", error);
      };

      await getMemberList(successFn, failFn, errorFn);
    } catch (error) {
      console.error("에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalClose = () => {
    setEditModalVisible(false);
    setPostModalVisible(false);
  };

  const handleMenuClick1 = (record: MemberList) => {
    setSelectedMember(record);
    setEditModalVisible(true);
  };

  const handleMenuClick2 = (record: MemberList) => {
    setSelectedMember(record);
    setPostModalVisible(true);
  };

  const columns = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "5%",
    },
    {
      title: "회원명",
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text: string, record: MemberList) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleMenuClick1(record)}>
                회원정보수정
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleMenuClick2(record)}>
                메일 보내기
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {text} <DownOutlined />
          </div>
        </Dropdown>
      ),
    },
    {
      title: "이메일",
      dataIndex: "address",
      key: "address",
      width: "30%",
    },
    {
      title: "전화번호",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "가입일",
      dataIndex: "age",
      key: "age",
    },
  ];

  return (
    <ModifyWrap>
      <MainTitle>회원 정보관리</MainTitle>
      <SubTitle>기본검색</SubTitle>
      <ModifyInfo>
        <BigKeyword style={{ borderTop: `1px solid ${Common.color.primary}` }}>
          <div className="left">검색어</div>
          <div className="right">
            <MemberSelect optionone={"아이디"} optiontwo={"이름"} />
            <MiddleInput />
          </div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">기간검색</div>
          <div className="right" style={{ gap: "5x" }}>
            <OrderPicker />
            <SmallButton style={{ minWidth: "40px" }}>오늘</SmallButton>
            <SmallButton style={{ minWidth: "40px" }}>어제</SmallButton>
            <SmallButton style={{ minWidth: "40px" }}>일주일</SmallButton>
            <SmallButton style={{ minWidth: "40px" }}>지난달</SmallButton>
            <SmallButton style={{ minWidth: "40px" }}>1개월</SmallButton>
            <SmallButton style={{ minWidth: "40px" }}>3개월</SmallButton>
            <SmallButton style={{ minWidth: "40px" }}>전체</SmallButton>
          </div>
        </BigKeyword>
        <BigKeyword>
          <div className="left">전화번호</div>
          <div className="right">
            <MiddleInput />
          </div>
        </BigKeyword>
      </ModifyInfo>
      <ModifyButton>
        <SearchButton>검색</SearchButton>
        <SearchButton style={{ background: " #f44336" }}>초기화</SearchButton>
      </ModifyButton>
      <BtList>
        <div>
          <SmallButton style={{ marginRight: "10px" }}>
            전체메일 발송
          </SmallButton>
          <SmallButton>엑셀 저장</SmallButton>
        </div>
      </BtList>
      <ListWrap>
        <Table dataSource={memberList} columns={columns} />
      </ListWrap>
      {editModalVisible && (
        <MemberModifyMD onClose={handleModalClose}></MemberModifyMD>
      )}
      {postModalVisible && <PostModal onClose={handleModalClose}></PostModal>}
    </ModifyWrap>
  );
};

export default MemberModify;
