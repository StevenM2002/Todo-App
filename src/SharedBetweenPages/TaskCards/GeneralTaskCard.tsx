import React, {FC, ReactNode, useRef, useState} from "react";
import TaskCard from "./TaskCard";
import Store, {Task} from "../../../Store";
import {Text, View} from "react-native";
import InputText from "../InputText";
import TimeLimitDropDown from "../AddTaskPage/TimeLimitDropDown";
import DateTimeHelpers from "../../../helpers/DateTimeHelpers";
import ButtonRectangle from "../ButtonRectangle";

interface EditableFields {
  title: boolean;
  description: boolean;
  timeLimit: boolean;
}

const GeneralTaskCard: FC<{task: Task; children?: ReactNode}> = ({
  task,
  children,
}) => {
  const [isEditMode, setIsEditMode] = useState<EditableFields>({
    title: false,
    description: false,
    timeLimit: false,
  });
  const [isErrMsg, setIsErrMsg] = useState<boolean>(false);
  const taskRef = useRef<{
    title: string;
    description: string;
    timeLimit?: number;
  }>({
    title: task.title,
    description: task.description,
    timeLimit: task.timeLimitToComplete,
  });

  const onCancel = () => {
    setIsEditMode(prevState => {
      Object.keys(prevState).forEach(
        it => (prevState[it as keyof EditableFields] = false),
      );
      return prevState;
    });
    setIsErrMsg(false);
  };

  const onSave = () => {
    if (isEditMode.title && taskRef.current.title.trim().length === 0) {
      setIsErrMsg(true);
      return;
    }
    Store.getTaskItems()
      .then(store => {
        if (isEditMode.title) {
          store.tasks[task.id].title = taskRef.current.title;
        }
        if (isEditMode.description) {
          store.tasks[task.id].description = taskRef.current.description;
        }
        if (isEditMode.timeLimit) {
          store.tasks[task.id].timeLimitToComplete = taskRef.current.timeLimit;
        }
        return store;
      })
      .then(store => {
        Store.setStore(store);
      })
      .then(() => onCancel())
      .catch(e => console.log("onSave: TaskCard", e));
  };

  const popupContent = () => {
    const descriptionToRender =
      task.description.trim().length === 0
        ? "No description given!"
        : task.description;
    return (
      <View>
        {isErrMsg ? (
          <Text style={{color: "red"}}>Title cannot be empty!</Text>
        ) : (
          <></>
        )}
        {isEditMode.title ? (
          <InputText
            defaultValue={taskRef.current.title}
            onChangeText={value => {
              taskRef.current.title = value;
              setIsErrMsg(false);
            }}
          />
        ) : (
          <Text
            onLongPress={() => {
              setIsEditMode(prevState => {
                taskRef.current.title = task.title;
                prevState.title = true;
                return prevState;
              });
            }}
            style={{textAlign: "center"}}>
            {task.title}
          </Text>
        )}
        <View style={{borderWidth: 1, marginVertical: 6}} />
        <Text
          style={{
            textDecorationLine: "underline",
            fontWeight: "bold",
            marginBottom: 6,
          }}>
          Description:
        </Text>
        {isEditMode.description ? (
          <InputText
            defaultValue={taskRef.current.description}
            onChangeText={value => (taskRef.current.description = value)}
          />
        ) : (
          <Text
            onLongPress={() => {
              setIsEditMode(prevState => {
                taskRef.current.description = task.description;
                prevState.description = true;
                return prevState;
              });
            }}>
            {descriptionToRender}
          </Text>
        )}
        <Text
          style={{
            textDecorationLine: "underline",
            fontWeight: "bold",
            marginBottom: 6,
          }}>
          Time limit:
        </Text>
        {isEditMode.timeLimit ? (
          <TimeLimitDropDown
            setSelectedValue={value => (taskRef.current.timeLimit = value)}
          />
        ) : (
          <Text
            onLongPress={() => {
              setIsEditMode(prevState => {
                taskRef.current.timeLimit = task.timeLimitToComplete;
                prevState.timeLimit = true;
                return prevState;
              });
            }}>
            {DateTimeHelpers.toString(task.timeLimitToComplete)}
          </Text>
        )}

        {Object.values(isEditMode).find(it => it) === undefined ? (
          <></>
        ) : (
          <View style={{flexDirection: "row", marginTop: 7}}>
            <View style={{flex: 1, marginRight: 3}}>
              <ButtonRectangle
                onPress={onSave}
                title={"Save"}
                backgroundColor={"#83FF8D"}
              />
            </View>
            <View style={{flex: 1, marginLeft: 3}}>
              <ButtonRectangle
                onPress={onCancel}
                title={"Cancel"}
                backgroundColor={"#FF8383"}
              />
            </View>
          </View>
        )}
      </View>
    );
  };
  return (
    <TaskCard
      task={task}
      onPopupClose={onCancel}
      popupContent={popupContent()}
      onPopupOpen={onCancel}>
      {children}
    </TaskCard>
  );
};

export default GeneralTaskCard;
