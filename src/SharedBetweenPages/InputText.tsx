import React, {FC} from "react";
import {TextInput} from "react-native";

const InputText: FC<{
  borderColor?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
}> = ({onChangeText, placeholder, borderColor = "#B48EFF"}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={true}
      style={{
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 7,
        padding: 10,
        paddingTop: 10,
      }}
    />
  );
};

export default InputText;
