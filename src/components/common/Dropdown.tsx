import React from "react";

interface DropdownProps {
  options: number[];
  selectedLimit: number;
  onChange: (limit: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedLimit,
  onChange,
}) => {
  return (
    <select
      className="border rounded p-2"
      value={selectedLimit}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}명
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
