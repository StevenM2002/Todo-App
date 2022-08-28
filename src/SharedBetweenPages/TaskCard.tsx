import React, {FC, useRef, useState} from "react";
import Store, {Task} from "../../Store";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Popup from "./Popup";
import InputText from "./InputText";
import ButtonRectangle from "./ButtonRectangle";

interface EditableFields {
  title: boolean;
  description: boolean;
}

const TaskCard: FC<{
  task: Task;
  child?: JSX.Element;
  backgroundColor?: string;
}> = ({task, child, backgroundColor = "#FFFFFF"}) => {
  const [getIsVisible, doSetIsVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState<EditableFields>({
    title: false,
    description: false,
  });
  const [isErrMsg, setIsErrMsg] = useState<boolean>(false);
  const taskRef = useRef<{title: string; description: string}>({
    title: task.title,
    description: task.description,
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

  const setIsVisible = (value: boolean) => {
    if (!value) {
      onCancel();
    }
    doSetIsVisible(value);
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
    <>
      <TouchableHighlight
        style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}
        onPress={() => setIsVisible(true)}
        underlayColor={"#B7B7B7"}
        activeOpacity={0.7}>
        <View>
          <Text style={{marginBottom: 15, marginHorizontal: 5}}>
            {task.title}
          </Text>
          {child}
        </View>
      </TouchableHighlight>
      <Popup
        getIsVisible={getIsVisible}
        setIsVisible={setIsVisible}
        child={popupContent()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  doCenter: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TaskCard;
