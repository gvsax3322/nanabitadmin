import { FC } from "react";
import { SelectStyle } from "../../styles/AdminBasic";

interface SelectProps {
  optionone: string; // Define the prop for the label of the first option
  optiontwo?: string;
  
}

const MemberSelect: FC<SelectProps> = ({ optionone, optiontwo }) => {

  return (
    <div>
      <SelectStyle>
        {/* Use the optionone prop for the label of the first option */}
        <option value="1">{optionone}</option>
        {optiontwo && <option value="2">{optiontwo}</option>}
      </SelectStyle>
    </div>
  );
};

export default MemberSelect;
