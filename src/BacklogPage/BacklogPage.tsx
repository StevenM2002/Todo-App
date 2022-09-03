import React, {FC, useState} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import Store, {Task} from "../../Store";
import ButtonRectangle from "../SharedBetweenPages/ButtonRectangle";
import AddTaskHeader from "../SharedBetweenPages/AddTaskHeader";
import GeneralTaskCard from "../SharedBetweenPages/TaskCards/GeneralTaskCard";

const BacklogPage: FC = () => {
  const [getBacklogTasks, setBacklogTasks] = useState<Task[]>();

  Store.getTaskItems()
    .then(store => store.backlogIds.map(id => store.tasks[id]))
    .then(tasks => setBacklogTasks(tasks))
    .catch(e => console.log("getTaskItems: BacklogPage", e));

  const onMoveToFrontend = (task: Task) => {
    (async () => {
      const store = await Store.getTaskItems();
      store.backlogIds = store.backlogIds.filter(id => id !== task.id);
      store.frontlogIds.push(task.id);
      store.tasks[task.id].metaData.timeMovedToFrontlog.push(Date.now());
      Store.setStore(store);
    })();
  };

  const onDelete = (task: Task) => {
    (async () => {
      const store = await Store.getTaskItems();
      store.backlogIds = store.backlogIds.filter(id => id !== task.id);
      delete store.identifiers[task.id];
      Store.setStore(store);
    })();
  };

  const cardButtons = (task: Task) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <ButtonRectangle
          onPress={() => onMoveToFrontend(task)}
          title={"Move to Home"}
          backgroundColor={"#46C2E0"}
        />
        <ButtonRectangle
          onPress={() => onDelete(task)}
          title={"Delete"}
          backgroundColor={"#FF8383"}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <AddTaskHeader title={"Backlog"} />
      <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
        <View>
          {getBacklogTasks?.length === 0 ? (
            <Text style={{textAlign: "center", fontWeight: "bold", margin: 10}}>
              You have no tasks in the backlog
            </Text>
          ) : (
            <></>
          )}
          {getBacklogTasks?.map(task => (
            <GeneralTaskCard task={task} key={task.id}>
              {cardButtons(task)}
            </GeneralTaskCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BacklogPage;
