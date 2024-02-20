import React from "react";
import { SelectStyle } from "../../../styles/AdminBasic";

interface SelectProps {
  option1?: string; // Define the prop for the label of the first option
  option2?: string; // Define the prop for the label of the second option
  option3?: string; // Define the prop for the label of the third option
  option4?: string; // Define the prop for the label of the fourth option
  option5?: string; // Define the prop for the label of the fifth option
  option6?: string; // Define the prop for the label of the sixth option
  option7?: string; // Define the prop for the label of the sixth option
}

const OrderAllSelect: React.FC<SelectProps> = ({
  option1,
  option2,
  option3,
  option4,
  option5,
  option6,
  option7,
}) => {
  return (
    <div>
      <SelectStyle>
        {/* Use the optionone prop for the label of the first option */}
        {option1 && <option value="option1">{option1}</option>}
        {option2 && <option value="option2">{option2}</option>}
        {option3 && <option value="option3">{option3}</option>}
        {option4 && <option value="option4">{option4}</option>}
        {option5 && <option value="option5">{option5}</option>}
        {option6 && <option value="option6">{option6}</option>}
        {option7 && <option value="option7">{option7}</option>}
      </SelectStyle>
    </div>
  );
};

export default OrderAllSelect;
