import React, {FC, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import ButtonRectangle from "./ButtonRectangle";
import AddTaskPage from "./AddTaskPage/AddTaskPage";

const AddTaskHeader: FC<{title: string}> = ({title}) => {
  const [isAddTaskPageVisible, setIsAddTaskPageVisible] = useState(false);
  return (
    <>
      <View style={styles.centerContainer}>
        <Text style={styles.text}>{title}</Text>
        <View style={{position: "absolute", right: 0, top: 0}}>
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
  },
  centerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },
});

export default AddTaskHeader;
