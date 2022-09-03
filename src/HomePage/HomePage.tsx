import React, {FC, useState} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import Store, {Task} from "../../Store";
import ButtonRectangle from "../SharedBetweenPages/ButtonRectangle";
import PossibleDotColors from "../ColourWallPage/PossibleDotColors";
import AddTaskHeader from "../SharedBetweenPages/AddTaskHeader";
import GeneralTaskCard from "../SharedBetweenPages/TaskCards/GeneralTaskCard";

function randomInt(max: number = 100): number {
  return Math.floor(Math.random() * max);
}

const HomePage: FC = () => {
  const [getFrontlogTasks, setFrontlogTasks] = useState<Task[]>();
  Store.getTaskItems()
    .then(store => store.frontlogIds.map(id => store.tasks[id]))
    .then(tasks => setFrontlogTasks(tasks))
    .catch(e => console.log("getTaskItems: HomePage", e));

  const onComplete = (task: Task) => {
    (async () => {
      try {
        const store = await Store.getTaskItems();
        store.frontlogIds = store.frontlogIds.filter(id => id !== task.id);
        store.completedDots[task.id] = {
          id: task.id,
          top: randomInt().toString() + "%",
          right: randomInt() + "%",
          color:
            PossibleDotColors[
              Math.floor(Math.random() * PossibleDotColors.length)
            ],
          size: randomInt(9) + 4,
        };
        store.tasks[task.id].metaData.timeOfCompletion = Date.now();
        Store.setStore(store);
      } catch (e) {
        console.log("onComplete: HomePage", e);
      }
    })();
  };

  const onMoveToBacklog = (task: Task) => {
    (async () => {
      const store = await Store.getTaskItems();
      store.frontlogIds = store.frontlogIds.filter(id => id !== task.id);
      store.backlogIds.push(task.id);
      store.tasks[task.id].metaData.timeMovedToBacklog.push(Date.now());
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
          onPress={() => onMoveToBacklog(task)}
          title={"Move to backlog"}
          backgroundColor={"#46C2E0"}
        />
        <ButtonRectangle
          onPress={() => onComplete(task)}
          title={"Complete!"}
          backgroundColor={"#83FF8D"}
        />
      </View>
    );
  };

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
            <GeneralTaskCard task={task} key={task.id}>
              {cardButtons(task)}
            </GeneralTaskCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
