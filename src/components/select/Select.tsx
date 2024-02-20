import React from "react";
import { SelectStyle } from "../../styles/AdminBasic";

interface SelectProps {
  optionone: string; // Define the prop for the label of the first option
}

const Select: React.FC<SelectProps> = ({ optionone }) => {
  return (
    <div>
      <SelectStyle>
        {/* Use the optionone prop for the label of the first option */}
        <option value="option1">{optionone}</option>
        <option value="option2">옵션 2</option>
        <option value="option3">옵션 3</option>
      </SelectStyle>
    </div>
  );
};

export default Select;
