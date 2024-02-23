import { SelectStyle } from "../../styles/AdminBasic";

export const SeletCt = () => {
  return (
    <SelectStyle style={{ width: "49%", height: "35px" }}>
      {/* Use the optionone prop for the label of the first option */}
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
      <option value="option3">옵션 3</option>
    </SelectStyle>
  );
};
