import { Table } from "antd";
import MemberSelect from "../../../components/select/MemberSelect";
import {
  BigKeyword,
  Common,
  MainTitle,
  MiddleInput,
  SearchButton,
  SubTitle,
} from "../../../styles/AdminBasic";
import { ListWrap, ModifyButton, ModifyInfo, ModifyWrap } from "./MemberModify";

interface DataSourceType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const dataSource: DataSourceType[] = [
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
const MemberDelete = () => {
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
      </ModifyInfo>
      <ModifyButton>
        <SearchButton>검색</SearchButton>
        <SearchButton style={{ background: " #f44336" }}>초기화</SearchButton>
      </ModifyButton>
      <ListWrap>
        <Table<DataSourceType> dataSource={dataSource} columns={columns} />
      </ListWrap>
    </ModifyWrap>
  );
};

export default MemberDelete;
