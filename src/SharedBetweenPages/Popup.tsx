import React, {FC} from "react";
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import ButtonRectangle from "./ButtonRectangle";

const Popup: FC<{
  getIsVisible: boolean;
  setIsVisible: (value: boolean) => void;
  child: React.ReactElement;
}> = ({getIsVisible, setIsVisible, child}) => {
  return (
    <SafeAreaView>
      <View style={styles.doCenter}>
        <Modal visible={getIsVisible} animationType={"fade"} transparent={true}>
          <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
            <View style={[styles.doCenter, styles.modalView]}>
              <View style={{marginTop: 20}}>
                {child}
                <View style={{marginTop: 20}}>
                  <ButtonRectangle
                    onPress={() => setIsVisible(false)}
                    title={"Exit"}
                    backgroundColor={"#FF8383"}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  doCenter: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Popup;
