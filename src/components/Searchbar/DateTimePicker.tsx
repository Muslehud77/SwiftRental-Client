
import { useTheme } from "../ThemeProvider";
;
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import  { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { motion } from 'framer-motion';
import { FaClock } from "react-icons/fa";
import { useState } from "react";


import dayjs from "dayjs";
import { Dialog } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { AnimatePresence } from 'framer-motion';
type DateTimePickerProps = {
  dateTime: DateObject[];
  setDateTime: (arg: DateObject[]) => void;
  showDatePicker : boolean;
  setShowDatePicker: (arg:boolean) => void;
};



const today = new Date();

const DateTimePicker = ({
  dateTime,
  setDateTime,
  showDatePicker,
  setShowDatePicker,
}: DateTimePickerProps) => {
  const { actualTheme } = useTheme();


  return (
    <motion.div
      className="fixed z-10"
      initial={{y: -50,opacity:0 }}
      animate={{y: 0,opacity:1 }}
      exit={{y: -50,opacity:0  }}
      onClick={() => setShowDatePicker(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Calendar
          value={dateTime}
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
      </div>
    </motion.div>
  );
};

export default DateTimePicker;
