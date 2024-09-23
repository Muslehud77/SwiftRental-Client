import { useTheme } from "../ThemeProvider";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "../ui/label";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectLocation, setTripTime } from "../../redux/features/Map/mapSlice";
import { isMobile } from "../../utils/isMobile";
import { useEffect } from "react";

type DateTimePickerProps = {
  showDatePicker: boolean;
  setShowDatePicker: (arg: boolean) => void;
  dates? : [Date,Date];
};

const today = new Date();

const DateTimePicker = ({
  showDatePicker,
  setShowDatePicker,
  dates
}: DateTimePickerProps) => {
  const { tripTime } = useAppSelector(selectLocation);

  useEffect(()=>{
    if(dates?.length){
       dispatch(setTripTime([dates[0], dates[1]]));
    }
  },[])

  const { actualTheme } = useTheme();
  const dispatch = useAppDispatch();
  // Helper function to ensure that the end date is not before the start date
  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    const endDate = new Date(end);
    const startDate = new Date(start);

    if (dates.length === 2) {
      if (endDate < startDate) {
        dispatch(setTripTime([end, start]));
      } else {
        dispatch(setTripTime([start, end]));
      }
    } else {
      dispatch(setTripTime(dates));
    }
  };

  const position = isMobile() ? "bottom" : "right";

  return (
    <div onClick={(e) => e.stopPropagation()} className="space-y-2 w-full">
      <Label className="font-semibold text-lg text-white">
        <FaCalendarAlt className="inline-block text-primary mr-2" />
        Set Trip Duration
      </Label>

      <motion.div
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="relative z-20 flex gap-4 max-w-2xl p-3 border border-primary/20 rounded-lg bg-black/60  transition w-full"
      >
        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg hover:scale-105 duration-300">
          <FaClock className="text-primary" />
          <p className=" dark:text-slate-400">
            Pick-up:{" "}
            <span className="font-semibold text-primary">
              {dayjs(tripTime[0] as unknown as Date).format(
                "MMM D, YYYY [at] h:mm A"
              )}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg hover:scale-105 duration-300">
          <FaClock className="text-primary" />
          <p className=" dark:text-slate-400">
            Return:{" "}
            <span className="font-semibold text-primary">
              {dayjs(tripTime[1] as unknown as Date).format(
                "MMM D, YYYY [at] h:mm A"
              )}
            </span>
          </p>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {showDatePicker && (
          <motion.div
            className="absolute z-[999]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              value={tripTime}
              onChange={
                handleDateChange as unknown as (
                  arg: [DateObject, DateObject]
                ) => void
              }
              className={`!bg-card ${
                actualTheme === "dark" ? "bg-dark" : ""
              } red `}
              shadow={false}
              showOtherDays
              minDate={today}
              range
              format="DD/MM/YYYY HH:mm"
              plugins={[
                <TimePicker hideSeconds position={position} />,
                <DatePanel
                  markFocused={true}
                  focusedClassName="opacity-70"
                  header="Trip Duration"
                  position={position}
                />,
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateTimePicker;
