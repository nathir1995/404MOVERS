import { useFormikContext } from "formik";
import { ValuesType } from "./formUtils";

import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
import StepControls from "../components/StepControls";

import colors from "@/assets/scss/colors.module.scss";
import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.scss";

import React from "react";
import Calendar from "react-calendar";
import { twoDigitsNumber } from "@/utility/number";
import Button from "@/components/Button";

// const today = new Date().toISOString().slice(0, 16);
const today = new Date();

type IProps = {
  controls: MuiStepSliderControlType;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const timeOptions: TimeOptionType[] = [
  { label: "9AM - 10AM", value: "09:00" },
  { label: "10AM - 11AM", value: "10:00" },
  { label: "11AM - 12PM", value: "11:00" },
  { label: "12PM - 1PM", value: "12:00" },
  { label: "1PM - 2PM", value: "13:00" },
  { label: "2PM - 3PM", value: "14:00" },
  { label: "3PM - 4PM", value: "15:00" },
  { label: "4PM - 5PM", value: "16:00" },
  { label: "5PM - 6PM", value: "17:00" },
  { label: "6PM - 7PM", value: "18:00" },
  { label: "7PM - 8PM", value: "19:00" },
  { label: "8PM - 9PM", value: "20:00" },
  { label: "9PM - 10PM", value: "21:00" },
  { label: "10PM - 11PM", value: "22:00" },
];

type TimeOptionType = {
  label: string;
  value: string;
};

const TimeOptionButton = ({
  option,
  onSelect,
  isDisabled,
}: {
  option: TimeOptionType;
  onSelect: (selectedValue: string) => void;
  isDisabled?: boolean;
}) => {
  const formik = useFormikContext<ValuesType>();
  const { move_date_time } = formik.values;

  const isSelected =
    move_date_time && move_date_time.split("T")[1] === option.value;

  return (
    <Button
      type="button"
      onClick={() => onSelect(option.value)}
      variant={isSelected ? "primary" : "outlined"}
      style={{ padding: ".5rem", width: "100%", marginBlock: ".25rem" }}
      isDisabled={isDisabled}
    >
      {option.label}
    </Button>
  );
};

const DateTimeForm = ({ controls }: IProps) => {
  const formik = useFormikContext<ValuesType>();
  const [selectedDate, setSelectedDate] = React.useState<Value>(
    formik.values.move_date_time ? new Date(formik.values.move_date_time) : null
  );

  const onDateChange = (newDate: Value) => {
    setSelectedDate(newDate);

    if (newDate instanceof Date) {
      const day = twoDigitsNumber(newDate.getDate());
      const month = twoDigitsNumber(newDate.getMonth() + 1);
      const year = newDate.getFullYear();
      const date = `${year}-${month}-${day}`;

      const oldValue = formik.values.move_date_time;
      if (oldValue === "") {
        formik.setFieldValue(
          "move_date_time",
          `${date}T${timeOptions[0].value}`
        );
      } else {
        const time = oldValue.split("T")[1];
        formik.setFieldValue("move_date_time", `${date}T${time}`);
      }
    }
  };

  const onTimeChange = (selectedTime: string) => {
    const move_date_time = formik.values.move_date_time;
    if (!move_date_time) return;
    const date = move_date_time.split("T")[0];
    formik.setFieldValue("move_date_time", `${date}T${selectedTime}`);
  };

  return (
    <>
      <div className={`${styles.padding_container} `}>
        <h4 style={{ marginBottom: ".5rem" }}>
          <span style={{ color: colors.primary }}>Schedule</span> Your Move
        </h4>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div>
            <h6>Select a Date</h6>
            <Calendar
              onChange={onDateChange}
              value={selectedDate}
              minDate={today}
            />
          </div>

          <div>
            <h6>Estimated Arrival Time</h6>
            <div
              className={`${styles.time_options_container} styled-scrollbar`}
            >
              {timeOptions.map((timeOption) => (
                <TimeOptionButton
                  key={timeOption.value}
                  option={timeOption}
                  onSelect={onTimeChange}
                  isDisabled={!formik.values.move_date_time}
                />
              ))}
            </div>
          </div>
        </div>

        {/* <TextField
          type="datetime-local"
          label="Date & Time"
          name="move_date_time"
          icon={null}
          min={today}
        /> */}
      </div>
      <StepControls controls={controls} />
    </>
  );
};

export default DateTimeForm;
