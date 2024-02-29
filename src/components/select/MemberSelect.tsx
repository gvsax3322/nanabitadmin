import { ChangeEvent, FC } from "react";
import { SelectStyle } from "../../styles/AdminBasic";

interface SelectProps {
  option1: string;
  option2: string;
  option3?: string;
  onClick?: (optionIndex: number) => void;
  defaultValue?: number;
}

const MemberSelect: FC<SelectProps> = ({
  option1,
  option2,
  option3,
  onClick,
}) => {
  const handleOptionClick = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    if (onClick) {
      onClick(selectedIndex);
    }
  };
  return (
    <div>
      <SelectStyle onChange={handleOptionClick}>
        {option1 && <option value="0">{option1}</option>}
        {option2 && <option value="1">{option2}</option>}
        {option3 && <option value="2">{option3}</option>}
      </SelectStyle>
    </div>
  );
};

export default MemberSelect;
