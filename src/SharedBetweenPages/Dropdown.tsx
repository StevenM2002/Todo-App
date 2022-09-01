import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import useInit from "../../helpers/customHooks/useInit";

export interface DropdownItem {
  name: string;
  value: any;
}
interface MainInterface {
  dropdownItems: DropdownItem[];
  defaultItem: DropdownItem;
  setSelectedValue: (value: any) => void;
}

const DropDownView: FC<{
  isOpen: boolean;
  children?: ReactNode;
  setBorderWidth: (val: number) => void;
  maxDropdownHeight?: number;
}> = ({isOpen, children, setBorderWidth, maxDropdownHeight = 150}) => {
  const dropAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isOpen) {
      setBorderWidth(1);
      Animated.timing(dropAnim, {
        useNativeDriver: false,
        duration: 500,
        toValue: maxDropdownHeight,
      }).start();
    } else {
      Animated.timing(dropAnim, {
        useNativeDriver: false,
        duration: 500,
        toValue: 0,
      }).start(({finished}) => (finished ? setBorderWidth(0) : null));
    }
  }, [isOpen, dropAnim, setBorderWidth, maxDropdownHeight]);

  return (
    <Animated.View style={{paddingHorizontal: 5, maxHeight: dropAnim}}>
      {children}
    </Animated.View>
  );
};

const DropdownItemJSX: FC<{
  item: DropdownItem;
  setSelectedValue: (val: any) => void;
  setSelectedName: (val: string) => void;
  setIsOpen: (val: boolean) => void;
}> = ({item, setSelectedValue, setSelectedName, setIsOpen}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        setSelectedValue(item.value);
        setSelectedName(item.name);
        setIsOpen(false);
      }}
      activeOpacity={0.7}
      underlayColor={"#B7B7B7"}
      style={styles.dropdownItemContainer}>
      <Text>{item.name}</Text>
    </TouchableHighlight>
  );
};

const Dropdown: FC<MainInterface> = ({
  dropdownItems,
  defaultItem,
  setSelectedValue,
}) => {
  const items: DropdownItem[] = [defaultItem, ...dropdownItems];
  const [isOpen, setIsOpen] = useState(false);
  const [dropAnimBorderWidth, setDropAnimBorderWidth] = useState(0);
  const [selectedName, setSelectedName] = useState(defaultItem.name);
  useInit(() => setSelectedValue(defaultItem.value));
  return (
    <View>
      <View
        style={styles.headContainer}
        onTouchStart={() => setIsOpen(prevState => !prevState)}>
        <Text>{selectedName}</Text>
      </View>
      <DropDownView isOpen={isOpen} setBorderWidth={setDropAnimBorderWidth}>
        <ScrollView
          style={[
            styles.dropdownContainer,
            {borderWidth: dropAnimBorderWidth},
          ]}>
          {items.map((each, index) => (
            <DropdownItemJSX
              item={each}
              key={index}
              setSelectedValue={setSelectedValue}
              setSelectedName={setSelectedName}
              setIsOpen={setIsOpen}
            />
          ))}
        </ScrollView>
      </DropDownView>
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    borderColor: "#8EB2FF",
  },
  dropdownItemContainer: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#B7B7B7",
  },
  dropdownContainer: {
    borderColor: "#8EB2FF",
  },
});

export default Dropdown;
