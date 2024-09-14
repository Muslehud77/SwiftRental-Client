
import { useTheme } from "../ThemeProvider";
;
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import  { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { motion } from 'framer-motion';
type DateTimePickerProps = {
  dateTime: {};
  setDateTime: (arg: DateObject[]) => void;
};



const today = new Date();

const DateTimePicker = ({ dateTime, setDateTime }: DateTimePickerProps) => {

  const { actualTheme } = useTheme();





  return (
    <motion.div className="flex justify-center items-center  ">
      <Calendar
      value={dateTime as Date[]}
        onChange={setDateTime}
        className={`!bg-background ${
          actualTheme === "dark" ? "bg-dark" : ""
        } red `}
        shadow={false}
        showOtherDays
        minDate={today}
        range
        format="DD/MM/YYYY HH:mm"
        plugins={[
          <TimePicker hideSeconds position="right" />,
          <DatePanel
            
            markFocused={true}
            focusedClassName="opacity-70"
            header="Trip Duration"
            position="right"
           
          />,
        ]}
      />
    </motion.div>
  );
};

export default DateTimePicker;
