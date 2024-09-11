import ReactSelect, { ActionMeta, MultiValue } from "react-select";
import { useTheme } from "../ThemeProvider";
import { useEffect, useRef } from "react";

type MultiSelectProps = {
  options: { value: string | number; label: string | number }[];
  value: { value: string | number; label: string | number }[];
  onChange: (
    newValue: MultiValue<{ value: string | number; label: string | number }>,
    actionMeta: ActionMeta<{ value: string | number; label: string | number }>
  ) => void;
  placeholder: string;
};

const MultiSelect = ({ options, value,onChange, placeholder }: MultiSelectProps) => {
   
    const {actualTheme} = useTheme()

    useEffect(()=>{
      const input = document.getElementById("react-select-2-input");
      if(input){
        input.classList.add("!text-foreground")
      }
     
       

    },[])


  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: actualTheme === "light" ? "45 100% 97%" : "276 100% 2%", // Set the background color for the input control
      color: "#333", // Set the text color for the input control
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "#f5f5f5", // Set background color for selected and unselected options
      color: state.isSelected ? "#fff" : "#333", // Set text color for selected and unselected options
    }),
  };

  return (
    <ReactSelect
      isMulti
      styles={customStyles}
      options={options}
      className="relative z-50"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default MultiSelect;
