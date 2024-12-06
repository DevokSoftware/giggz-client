import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./RangeDatePicker.module.scss";

interface DatePickerProps {
  startDate: Date;
  endDate?: Date | null;
  onChange: (value: [Date | null, Date | null]) => void;
  placeholder?: string;
}

export const RangeDatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onChange,
  placeholder,
}: DatePickerProps) => {
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        onChange(update);
      }}
      isClearable={true}
      className={classes.datePicker}
      wrapperClassName={classes.datePickerContainer}
      clearButtonClassName={classes.clearButtonCalendar}
      calendarIconClassname={classes.calendarIcon}
      portalId="root-portal"
      dateFormat="dd/MM/yyyy"
      placeholderText={placeholder}
      calendarClassName={classes.calendarDatePicker}
    />
  );
};
