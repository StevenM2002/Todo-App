import React, {useEffect, useState} from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {NavigationContainer} from "@react-navigation/native";
import HomePage from "./src/HomePage/HomePage";
import BacklogPage from "./src/BacklogPage/BacklogPage";
import Store, {StoreType} from "./Store";
import ColourWallPage from "./src/ColourWallPage/ColourWallPage";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {LogBox} from "react-native";
LogBox.ignoreLogs(["Sending..."]);
const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [isReadyToRender, setIsReadyToRender] = useState<boolean>(false);
  const initStore = () => {
    try {
      Store.getTaskItems().catch(e => {
        throw e;
      });
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
    initStore();
  }, []);
  if (!isReadyToRender) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarPosition={"bottom"} initialRouteName={"Home"}>
        <Tab.Screen
          key={1}
          name={"Home"}
          component={HomePage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          key={2}
          name={"Backlog"}
          component={BacklogPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="text-box-multiple-outline"
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          key={3}
          name={"Colour Wall"}
          component={ColourWallPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="wall" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
