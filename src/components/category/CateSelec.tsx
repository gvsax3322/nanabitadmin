import React from "react";
import { SelectStyle } from "../../styles/AdminBasic";

interface Option {
  label: string | number;
  value: number | string;
}

interface SelectProps {
  options?: Option[]; // Define the prop for the array of options
  onChange?: (optionIndex: number) => void; // Define the prop for the onChange event
  value: string | number | readonly string[] | undefined; // Exclude null from the type
}

const CateSelec: React.FC<SelectProps> = ({
  options = [],
  onChange,
  value,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    if (onChange) {
      onChange(selectedIndex); // Call onChange with the selected index
    }
  };

  return (
    <div>
      {/* Use the onChange event on the select element */}
      <SelectStyle
        style={{ fontSize: "12px" }}
        onChange={handleOptionChange}
        value={value}
      >
        {/* Map through the options array and render each option */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectStyle>
    </div>
  );
};

export default CateSelec;
