import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Table } from "antd";
import { useState } from "react";
import styled from "styled-components";
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

export const ModifyWrap = styled.div`
  width: 100%;
  height: auto;
`;

export const ModifyInfo = styled.div`
  margin-bottom: 20px;
`;

export const ModifyButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 20px;
`;

export const BtList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ListWrap = styled.div`
  /* thead 부분 */
  .ant-table-thead .ant-table-cell {
    color: #000;
    border: 1px solid #000;
    text-align: center;
    padding: 10px;
    height: 30px;
    background: #cccccc;
  }
  /* tbody border 부분 */
  .ant-table-tbody > tr > td {
    transition: background 0.2s, border-color 0.2s;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }
  /* tbody 내용부분 */
  .ant-table-wrapper .ant-table-tbody > tr > td {
    padding: 0px;
    text-align: center;
    font-size: 18px;
    height: 40px;
  }
`;

const dataSource = [
  {
    key: "1",
    name: "John Doe",
    age: 30,
    address: "New York",
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 25,
    address: "Los Angeles",
  },
  {
    key: "3",
    name: "Mike Johnson",
    age: 35,
    address: "Chicago",
  },
];

interface DataSourceType {
  key: string;
  name: string;
  age: number;
  address: string;
}
const MemberModify = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<DataSourceType | null>(
    null,
  );

  const handleModalClose = () => {
    setEditModalVisible(false);
    setPostModalVisible(false);
  };

  const handleMenuClick1 = (record: DataSourceType) => {
    console.log(`Action 1 clicked for ${record.name}`);
    setSelectedMember(record);
    setEditModalVisible(true);
  };

  const handleMenuClick2 = (record: DataSourceType) => {
    console.log("너 포스트눌렀자나");
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
      render: (text: string, record: DataSourceType) => (
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
        <Table dataSource={dataSource} columns={columns} />
      </ListWrap>
      {editModalVisible && (
        <MemberModifyMD onClose={handleModalClose}></MemberModifyMD>
      )}
      {postModalVisible && <PostModal onClose={handleModalClose}></PostModal>}
    </ModifyWrap>
  );
};

export default MemberModify;
