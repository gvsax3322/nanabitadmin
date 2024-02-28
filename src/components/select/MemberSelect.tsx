import { ChangeEvent, FC } from "react";
import { SelectStyle } from "../../styles/AdminBasic";

interface SelectProps {
  option1?: string;
  option2?: string;
  option3?: string;
  onClick?: (optionIndex: number) => void;
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
      onClick(selectedIndex); // Call onClick with the selected index
    }
  };
  return (
    <div>
      <SelectStyle onChange={handleOptionClick}>
        {/* Use the optionone prop for the label of the first option */}
        {option1 && <option value="0">{option1}</option>}
        {option2 && <option value="1">{option2}</option>}
        {option3 && <option value="2">{option3}</option>}
      </SelectStyle>
    </div>
  );
};

export default MemberSelect;
