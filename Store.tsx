import AsyncStorage from "@react-native-async-storage/async-storage";
export interface StoreType {
  identifiers: number[];
  frontlogIds: number[];
  backlogIds: number[];
  completedDots: {
    [id: number]: WallDot;
  };
  tasks: {
    [key: number]: Task;
  };
}

export interface WallDot {
  id: number;
  top: string;
  right: string;
  color: string;
  size: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  metaData: {
    timeCreated: number;
  };
  timeLimitToComplete?: number;
}

const Store = {
  getTaskItems: async (): Promise<StoreType> => {
    try {
      const store: string | null = await AsyncStorage.getItem("store");
      if (store == null) {
        throw new Error("getTaskItems:Store: store is null");
      }
      return JSON.parse(store);
    } catch (e) {
      throw new Error(e + "getTaskItems:Store");
    }
  },
  setStore: (toStore: StoreType) => {
    AsyncStorage.setItem("store", JSON.stringify(toStore)).catch(e =>
      console.log("setStore:Store", e),
    );
  },
};

export default Store;
