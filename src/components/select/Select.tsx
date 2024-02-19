
import { Common } from "../../styles/AdminBasic";
import styled from "@emotion/styled";

const SelectStyle = styled.select`
  height: 25px;
  width: 70px;
  border: 2px solid ${Common.color.p500};
  border-radius: 5px;
  margin-right: 7px;
`;

const Select = () => {
  return (
    <div>
      <SelectStyle>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
      </SelectStyle>
    </div>
  );
};

export default Select;
