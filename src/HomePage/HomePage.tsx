import React, {FC, useState} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import Store, {Task} from "../../Store";
import AddTaskHeader from "../SharedBetweenPages/AddTaskHeader";
import FrontlogTaskCard from "./FrontlogTaskCard";

const HomePage: FC = () => {
  const [getFrontlogTasks, setFrontlogTasks] = useState<Task[]>();
  Store.getTaskItems()
    .then(store => store.frontlogIds.map(id => store.tasks[id]))
    .then(tasks => setFrontlogTasks(tasks))
    .catch(e => console.log("getTaskItems: HomePage", e));

  return (
    <SafeAreaView style={{flex: 1}}>
      <AddTaskHeader title={"Home"} />
      <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
        <View>
          {getFrontlogTasks?.length === 0 ? (
            <Text style={{fontWeight: "bold", textAlign: "center", margin: 10}}>
              You have no tasks here
            </Text>
          ) : (
            <></>
          )}
          {getFrontlogTasks?.map(task => (
            <FrontlogTaskCard task={task} key={task.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
