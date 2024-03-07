import styled from "@emotion/styled";
import { ConfigProvider, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { GetProduct } from "../../pages/admin/item/ItemAll";
import { Common, SearchButton } from "../../styles/AdminBasic";
import ModifyModal from "../common/ModifyModal";
import { Category, mainCategories, subCategories } from "../common/SearchCt";
import { API_SERVER_HOST } from "../../util/util";

export interface IDataItem {
  key: number;
  name: string;
  item: string;
  category: string;
  inventory: string;
  sale: string;
  bt?: JSX.Element;
  img?: JSX.Element;
}
interface ItemTableModify {
  tableNum: (data: any) => void;
  productList: GetProduct[]; // 이 부분 수정
  reset: any;
  setProductList: any;
}

const findCategoryName = (
  categoryId: number,
  categories: Category[],
): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : "";
};

const ItemTable: React.FC<ItemTableModify> = ({
  tableNum,
  productList,
  reset,
  setProductList,
}) => {
  console.log(productList);
  const aaa = productList;

  console.log(aaa);
  const [showModal, setShowModal] = useState(false);
  const [modifyData, setModifyData] = useState<GetProduct[]>([]);

  // ResultModal을 보여주는 함수
  const handleShowModal = (record: GetProduct) => {
    console.log(record);
    setShowModal(true);
    const bbb = [record]; // 배열로 감싸기
    setModifyData(bbb);
  };
  console.log("각 데이터", modifyData);
  // ResultModal을 닫는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [getTableData, setGetTableData] = useState<GetProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (productList.length > 0) {
      let pageSize = 10;
      setTotalPages(Math.ceil(productList[0].totalCount / pageSize) * 10);
    }
  }, [productList]);

  const onSelectChange = (selectedRowKeys: React.Key[], record: any[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);

    setSelectedRowKeys(selectedRowKeys);
    console.log(record);
    tableNum(record);
  };
  // const onSelect = (record: any, selected: any) => {
  //   setSelectedRowKeys(record)
  //   console.log("Selected Row:", selectedRowKeys, "Selected:", selected);
  //   // 선택된 행에 대한 추가적인 처리
  // };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onSelect,
    onSelectAll: (selected: any, selectedRows: any) => {
      console.log(
        "All rows selected:",
        selected,
        "Selected Rows:",
        selectedRows,
      );
      // 모든 행에 대한 추가적인 처리
    },
  };

  const columns = [
    {
      title: "상품번호",
      dataIndex: "key",
    },
    {
      title: "이미지",
      dataIndex: "productPic",
      render: (productPic: string, aaa: any): any => (
        <img
          style={{ width: "190px", height: "66px", objectFit: "cover" }}
          src={`${API_SERVER_HOST}/pic/product/${aaa.iproduct}/${productPic[0]}`}
          alt=""
          className="diaryadd-img-before"
        />
      ),
    },
    {
      title: "상품명",
      dataIndex: "productNm",
    },
    {
      title: "카테고리",
      render: (record: GetProduct) => {
        const mainCategoryName = findCategoryName(record.imain, mainCategories);
        const subCategoryName =
          subCategories.find(
            category =>
              category.parentId === record.imain &&
              category.id === record.imiddle,
          )?.name || "";
        return `${mainCategoryName} > ${subCategoryName}`;
      },
    },

    {
      title: "재고",
      dataIndex: "remainedCnt",
    },
    {
      title: "판매가",
      dataIndex: "price",
      render: (price: number) => <span>{price.toLocaleString()}</span>,
    },
    {
      title: "관리",
      render: (record: GetProduct) => (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchButton onClick={() => handleShowModal(record)}>
              수정
            </SearchButton>
          </div>
        </>
      ),
    },
  ];

  const data: IDataItem[] = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      key: i + 1,
      name: `Edward King ${i}`,
      item: `어떤 유아 용품이 제일 잘 나가요?. ${i}`,
      category: `잘하고 있나요? ${i}`,
      inventory: `재고 얼마나 있나요? ${i}`,
      sale: `얼마에 팔까요? ${i}`,

      // img: (
      //   <img
      //     style={{ width: "100px", height: "50px" }}
      //     src={process.env.PUBLIC_URL + "/assets/images/testimg.jpg"}
      //   />
      // ),
    });
  }

  const Aaa = styled(Table)`
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-table-wrapper
      .ant-table-tbody
      .ant-table-row.ant-table-row-selected
      > .ant-table-cell {
      background-color: ${Common.color.p800};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${Common.color.p600};
      border-color: ${Common.color.p800};
    }
    .ant-checkbox-wrapper-checked:hover .ant-checkbox-inner,
    .ant-checkbox-checked:hover .ant-checkbox-inner {
      border-color: rgba(40, 40, 40, 0.8) !important;
    }

    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: #d9d9d9 !important;
    }
    :where(.css-dev-only-do-not-override-1xg9z9n).ant-checkbox-indeterminate
      .ant-checkbox-inner:after {
      background-color: ${Common.color.p800};
    }
    &&& {
      .ant-table-thead > tr > th {
        text-align: center;
      }
      .ant-table-tbody > tr > td {
        text-align: center;
      }
    }
  `;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#a5a5a5",
        },
        components: {
          Table: {
            headerBg: "#535353",
            headerColor: "#fff",
          },
        },
      }}
    >
      <Aaa
        rowSelection={rowSelection}
        columns={columns}
        dataSource={
          aaa &&
          aaa.map(product => ({
            ...product,
            key: product.iproduct,
          }))
        }
        pagination={false}
        bordered
        locale={{ emptyText: "비어있음" }}
      />
      <Pagination
        style={{ textAlign: "center" }}
        total={totalPages}
        current={currentPage}
        showSizeChanger={false}
      />
      {showModal && (
        <ModifyModal
          onClose={handleCloseModal}
          patchData={modifyData}
          reset={reset}
          setProductList={setProductList}
        />
      )}
    </ConfigProvider>
  );
};

export default ItemTable;
