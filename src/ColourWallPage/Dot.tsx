import React, {FC} from "react";
import {WallDot} from "../../Store";
import {StyleSheet, View} from "react-native";

const Dot: FC<{dotInfo: WallDot}> = ({dotInfo}) => {
  const styles = StyleSheet.create({
    dotStyle: {
      width: dotInfo.size,
      height: dotInfo.size,
      borderRadius: dotInfo.size / 2,
      backgroundColor: dotInfo.color,
      position: "absolute",
      top: dotInfo.top,
      right: dotInfo.right,
    },
  });

  return <View style={styles.dotStyle} />;
};

export default Dot;
