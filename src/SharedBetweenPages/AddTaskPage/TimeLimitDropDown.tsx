import React, {FC} from "react";
import Dropdown, {DropdownItem} from "../Dropdown";
import DateTimeHelpers from "../../../helpers/DateTimeHelpers";

const dropdownItems: DropdownItem[] = [
  {name: "1 minute", value: 60000},
  {name: "30 minutes", value: DateTimeHelpers.hoursToMs(0.5)},
  {name: "1 hour", value: DateTimeHelpers.hoursToMs(1)},
  {name: "1 hour 30 mins", value: DateTimeHelpers.hoursToMs(1.5)},
  {name: "1 day", value: DateTimeHelpers.hoursToMs(24)},
  {name: "2 days", value: DateTimeHelpers.hoursToMs(48)},
];

const TimeLimitDropDown: FC<{
  setSelectedValue: (value: number) => void;
}> = ({setSelectedValue}) => {
  return (
    <Dropdown
      dropdownItems={dropdownItems}
      defaultItem={{name: "No time limit", value: undefined}}
      setSelectedValue={setSelectedValue}
    />
  );
};

export default TimeLimitDropDown;
