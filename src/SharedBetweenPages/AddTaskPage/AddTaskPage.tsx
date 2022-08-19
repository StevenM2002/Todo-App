import React, {FC} from "react";
import FormAddTask from "./FormAddTask";
import Popup from "../Popup";

const AddTaskPage: FC<{
  getIsVisible: boolean;
  setIsVisible: (value: boolean) => void;
}> = ({getIsVisible, setIsVisible}) => {
  return (
    <Popup
      getIsVisible={getIsVisible}
      setIsVisible={setIsVisible}
      child={<FormAddTask setIsVisible={setIsVisible} />}
    />
  );
};

export default AddTaskPage;
