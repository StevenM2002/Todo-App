import React, {FC} from "react";
import {TextInput} from "react-native";

const InputText: FC<{
  borderColor?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  autoFocus?: boolean;
  defaultValue?: string;
}> = ({
  onChangeText,
  placeholder,
  borderColor = "#B48EFF",
  autoFocus = false,
  defaultValue,
}) => {
  return (
    <TextInput
      autoFocus={autoFocus}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={true}
      value={defaultValue}
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
