import React, {FC, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import ButtonRectangle from "./ButtonRectangle";
import AddTaskPage from "./AddTaskPage/AddTaskPage";

const AddTaskHeader: FC<{title: string}> = ({title}) => {
  const [isAddTaskPageVisible, setIsAddTaskPageVisible] = useState(false);
  return (
    <>
      <View style={[styles.centerContainer, styles.header]}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.button}>
          <ButtonRectangle
            onPress={() => setIsAddTaskPageVisible(true)}
            title={"Add Task"}
            backgroundColor={"#888888"}
          />
        </View>
      </View>
      <AddTaskPage
        getIsVisible={isAddTaskPageVisible}
        setIsVisible={setIsAddTaskPageVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: "600",
    color: "1C1C1E",
    alignSelf: "center",
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
    alignItems: "center",
  },
  header: {
    marginBottom: 13,
    maxHeight: "3%",
  },
  button: {
    position: "absolute",
    right: 10,
    top: "auto",
  },
});

export default AddTaskHeader;
