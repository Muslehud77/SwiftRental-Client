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

type DateTimePickerProps = {
  dateTime: DateObject[] | Date[];
  setDateTime: (arg: DateObject[]) => void;
  showDatePicker: boolean;
  setShowDatePicker: (arg: boolean) => void;
};

const today = new Date();

const DateTimePicker = ({
  dateTime,
  setDateTime,
  showDatePicker,
  setShowDatePicker,
}: DateTimePickerProps) => {
  const { actualTheme } = useTheme();

  // Helper function to ensure that the end date is not before the start date
  const handleDateChange = (dates: DateObject[]) => {
    if (dates.length === 2) {
      const [startDate, endDate] = dates;
      if (endDate<startDate) {
        // If endDate is before startDate, set endDate to startDate
        setDateTime([startDate, startDate]);
      } else {
        setDateTime(dates);
      }
    } else {
      setDateTime(dates);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="space-y-2 w-full">
      <Label className="font-semibold text-lg text-white">
        <FaCalendarAlt className="inline-block text-primary mr-2" />
        Set Trip Duration
      </Label>

      <motion.div
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="relative z-20 flex gap-4 p-3 border border-primary/20 rounded-lg bg-background/60 hover:bg-primary/5 transition w-full"
      >
        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg hover:scale-105 duration-300">
          <FaClock className="text-primary" />
          <p className="text-muted-foreground">
            Pick-up:{" "}
            <span className="font-semibold text-primary">
              {dayjs(dateTime[0] as unknown as Date).format("MMM D, YYYY [at] h:mm A")}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg hover:scale-105 duration-300">
          <FaClock className="text-primary" />
          <p className="text-muted-foreground">
            Return:{" "}
            <span className="font-semibold text-primary">
              {dayjs(dateTime[1] as unknown as Date).format("MMM D, YYYY [at] h:mm A")}
            </span>
          </p>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {showDatePicker && (
          <motion.div
            className="fixed z-[999]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              value={dateTime}
              onChange={handleDateChange}
              className={`!bg-card ${
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateTimePicker;
