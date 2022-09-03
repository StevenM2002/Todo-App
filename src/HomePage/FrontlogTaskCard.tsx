import React, {FC, ReactNode} from "react";
import Store, {Task} from "../../Store";
import PossibleDotColors from "../ColourWallPage/PossibleDotColors";
import {Text, View} from "react-native";
import ButtonRectangle from "../SharedBetweenPages/ButtonRectangle";
import GeneralTaskCard from "../SharedBetweenPages/TaskCards/GeneralTaskCard";
import DateTimeHelpers from "../../helpers/DateTimeHelpers";

function randomInt(max: number = 100): number {
  return Math.floor(Math.random() * max);
}

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

function getTimeLeft(task: Task) {
  if (task.timeLimitToComplete === undefined) return undefined;
  return (
    Math.max(...task.metaData.timeMovedToFrontlog) +
    task.timeLimitToComplete -
    Date.now()
  );
}

const displayTimeLeft = (task: Task): ReactNode => {
  if (!task.timeLimitToComplete) {
    return <></>;
  }
  const timeLeft = getTimeLeft(task);
  const toDisplay = DateTimeHelpers.toSimpleString(timeLeft);
  return (
    <View>
      <Text style={{marginBottom: 15, marginHorizontal: 5}}>
        {toDisplay ? (timeLeft < 0 ? "Overdue by: " : "Due in: ") : null}
        {toDisplay}
      </Text>
    </View>
  );
};

const cardButtonsAndTimeLimit = (task: Task) => {
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

const FrontlogTaskCard: FC<{task: Task}> = ({task}) => {
  const backgroundColor = (() => {
    const timeLimit = getTimeLeft(task);
    if (!timeLimit) return undefined;
    return timeLimit < 0 ? "#FF8383" : undefined;
  })();
  return (
    <GeneralTaskCard task={task} backgroundColor={backgroundColor}>
      <View style={{justifyContent: "center"}}>{displayTimeLeft(task)}</View>
      {cardButtonsAndTimeLimit(task)}
    </GeneralTaskCard>
  );
};

export default FrontlogTaskCard;
