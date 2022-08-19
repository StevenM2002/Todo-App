import React, {FC} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

interface Props {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
}

const ButtonRectangle: FC<Props> = ({
  onPress,
  title,
  backgroundColor = "azure",
}) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      justifyContent: "center",
      padding: 10,
      borderColor: `${backgroundColor}`,
      backgroundColor: `${backgroundColor}`,
      borderRadius: 7,
      alignItems: "center",
    },
    textStyle: {
      fontSize: 15,
      fontWeight: "400",
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonRectangle;
