import React from "react";
import { SelectStyle } from "../../styles/AdminBasic";

const MonthlySelect = () => {
  return (
    <div>
      <SelectStyle>
        {/* Use the optionone prop for the label of the first option */}
        <option value="1">1월</option>
        <option value="2">2월</option>
        <option value="3">3월</option>
        <option value="4">4월</option>
        <option value="5">5월</option>
        <option value="6">6월</option>
        <option value="7">7월</option>
        <option value="8">8월</option>
        <option value="9">9월</option>
        <option value="10">10월</option>
        <option value="11">11월</option>
        <option value="12">12월</option>
      </SelectStyle>
    </div>
  );
};

export default MonthlySelect;
