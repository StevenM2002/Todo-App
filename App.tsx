/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./src/HomePage/HomePage";
import BacklogPage from "./src/BacklogPage/BacklogPage";
import Store, {StoreType} from "./Store";
import AddTaskHeader from "./src/SharedBetweenPages/AddTaskHeader";
import ColourWallPage from "./src/ColourWallPage/ColourWallPage";

const Tab = createBottomTabNavigator();

const App = () => {
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const initStore = async (): Promise<void> => {
    try {
      await Store.getTaskItems();
    } catch (e) {
      const storeToAdd: StoreType = {
        frontlogIds: [1],
        backlogIds: [0],
        completedDots: {},
        tasks: {
          0: {
            id: 0,
            title: "Move to frontlog/ home",
            description:
              "Move me to the frontlog AKA home to start me as a task.\n You can move me back and then delete me forever",
            metaData: {timeCreated: Date.now()},
          },
          1: {
            id: 1,
            title: "Make your first task",
            description:
              "Press the add task button to add a task to the backlog which you can then move to the frontlog/ home page here. \n\nWhen you complete this task, you will see me on your Colour Wall as a dot!\n\n Try and fill the Colour wall",
            metaData: {timeCreated: Date.now()},
          },
        },
        identifiers: [0, 1],
      };
      Store.setStore(storeToAdd);
    } finally {
      setIsReadyToRender(true);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await initStore();
      } catch (e) {
        console.log("initStore:useEffect:App", e);
      }
    })();
  }, []);
  if (!isReadyToRender) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={"Home"}
          component={HomePage}
          options={{
            headerTitle: () => <AddTaskHeader title={"Home"} />,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={"Backlog"}
          component={BacklogPage}
          options={{
            headerTitle: () => <AddTaskHeader title={"Backlog"} />,
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="text-box-multiple-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"Colour Wall"}
          component={ColourWallPage}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="wall" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
