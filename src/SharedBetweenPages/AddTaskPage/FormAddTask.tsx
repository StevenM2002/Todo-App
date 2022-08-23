import React, {FC, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import InputText from "../InputText";
import ButtonRectangle from "../ButtonRectangle";
import Store from "../../../Store";

const FormAddTask: FC<{
  setIsVisible: (value: boolean) => void;
}> = ({setIsVisible}) => {
  const [isShowInputErrorMessage, setIsShowInputErrorMessage] = useState(false);

  const inputs: {title: string; description: string} = {
    title: "",
    description: "",
  };

  const onSubmit = () => {
    if (inputs.title.trim().length === 0) {
      setIsShowInputErrorMessage(true);
      return;
    }
    (async () => {
      const store = await Store.getTaskItems();
      const generatedId = Math.max(...store.identifiers) + 1;
      store.tasks[generatedId] = {
        title: inputs.title,
        description: inputs.description,
        metaData: {timeCreated: Date.now()},
        id: generatedId,
      };
      store.backlogIds = [...store.backlogIds, generatedId];
      store.identifiers = [...store.identifiers, generatedId];
      Store.setStore(store);
    })();
    setIsVisible(false);
  };

  return (
    <>
      <Text style={{textAlign: "center", fontWeight: "bold"}}>
        Add Task To Backlog!
      </Text>
      <View style={{borderWidth: 1, marginVertical: 10}} />
      <View style={styles.inputContainer}>
        {isShowInputErrorMessage ? (
          <Text style={{color: "red"}}>Task name cannot be empty</Text>
        ) : (
          <></>
        )}
        <InputText
          autoFocus={true}
          placeholder={"Task Name"}
          onChangeText={value => {
            inputs.title = value;
            setIsShowInputErrorMessage(false);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputText
          placeholder={"Description"}
          onChangeText={value => (inputs.description = value)}
        />
      </View>
      <View style={{marginTop: 10}}>
        <ButtonRectangle
          onPress={onSubmit}
          title={"Add task!"}
          backgroundColor={"#46C2E0"}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
});

export default FormAddTask;
