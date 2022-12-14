import React, {FC, ReactNode, useState} from "react";
import {Task} from "../../../Store";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Popup from "../Popup";

const TaskCard: FC<{
  task: Task;
  children?: ReactNode;
  backgroundColor?: string;
  popupContent: JSX.Element;
  onPopupOpen?: () => void;
  onPopupClose?: () => void;
}> = ({
  task,
  children,
  backgroundColor = "#FFFFFF",
  popupContent,
  onPopupOpen,
  onPopupClose,
}) => {
  const [getIsVisible, doSetIsVisible] = useState(false);

  const setIsVisible = (value: boolean) => {
    if (!value && onPopupOpen) {
      onPopupOpen();
    } else if (onPopupClose) {
      onPopupClose();
    }
    doSetIsVisible(value);
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
          {children}
        </View>
      </TouchableHighlight>
      <Popup
        getIsVisible={getIsVisible}
        setIsVisible={setIsVisible}
        child={popupContent}
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
