import React from "react";
import { SelectStyle } from "../../../styles/AdminBasic";

interface SelectProps {
  option1?: string | number; // Define the prop for the label of the first option
  option2?: string | number; // Define the prop for the label of the second option
  option3?: string | number; // Define the prop for the label of the third option
  option4?: string | number; // Define the prop for the label of the fourth option
  option5?: string | number; // Define the prop for the label of the fifth option
  option6?: string | number; // Define the prop for the label of the sixth option
  option7?: string | number; // Define the prop for the label of the sixth option
  option8?: string | number; // Define the prop for the label of the sixth option
  onClick?: (optionIndex: number) => void; // Define the prop for the onClick event
}

const OrderAllSelect: React.FC<SelectProps> = ({
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
  option8,
  onClick,
}) => {
  const handleOptionClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    if (onClick) {
      onClick(selectedIndex); // Call onClick with the selected index
    }
  };

  return (
    <div>
      {/* Use the onChange event on the select element */}
      <SelectStyle style={{ fontSize: "12px" }} onChange={handleOptionClick}>
        {/* Use the option props to render the options */}
        {option1 && <option value="option1">{option1}</option>}
        {option2 && <option value="option2">{option2}</option>}
        {option3 && <option value="option3">{option3}</option>}
        {option4 && <option value="option4">{option4}</option>}
        {option5 && <option value="option5">{option5}</option>}
        {option6 && <option value="option6">{option6}</option>}
        {option7 && <option value="option7">{option7}</option>}
        {option8 && <option value="option8">{option8}</option>}
      </SelectStyle>
    </div>
  );
};

export default OrderAllSelect;
