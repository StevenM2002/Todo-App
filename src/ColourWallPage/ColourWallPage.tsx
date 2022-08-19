import React, {FC, useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import Store, {WallDot} from "../../Store";
import Dot from "./Dot";

const ColourWallPage: FC = () => {
  const [getWallDots, setWallDots] = useState<WallDot[]>();
  Store.getTaskItems()
    .then(store => {
      return Object.values(store.completedDots);
    })
    .then(dots => setWallDots(dots))
    .catch(e => console.log("getTaskItems: ColourWallPage", e));

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      {getWallDots?.map(dotInfo => <Dot dotInfo={dotInfo} key={dotInfo.id} />)}
    </SafeAreaView>
  );
};

export default ColourWallPage;
