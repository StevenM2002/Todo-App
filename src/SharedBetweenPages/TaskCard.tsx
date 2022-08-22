import React, {FC, useState} from "react";
import {Task} from "../../Store";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Popup from "./Popup";

const TaskCard: FC<{
  task: Task;
  child?: JSX.Element;
  backgroundColor?: string;
}> = ({task, child, backgroundColor = "#FFFFFF"}) => {
  const [getIsVisible, setIsVisible] = useState(false);

  const popupContent = () => {
    return (
      <View>
        <Text style={{textAlign: "center"}}>{task.title}</Text>
        <View style={{borderWidth: 1, marginVertical: 6}} />
        <Text
          style={{
            textDecorationLine: "underline",
            fontWeight: "bold",
            marginBottom: 6,
          }}>
          Description:
        </Text>
        {task.description.trim().length === 0 ? (
          <Text>No description given!</Text>
        ) : (
          <Text>{task.description}</Text>
        )}
      </View>
    );
  };

  return (
    <>
      <TouchableHighlight
        style={[styles.buttonContainer, {backgroundColor: backgroundColor}]}
        onPress={() => setIsVisible(true)}>
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
