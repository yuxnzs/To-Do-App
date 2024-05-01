import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";

import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // Keyboard.dismiss() 會在按下按鈕時關閉鍵盤
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    // splice() 方法會改變原始陣列，所以要先複製一份
    let itemsCopy = [...taskItems];

    // 接著，使用 splice 方法從 itemsCopy 陣列中移除指定的元素。
    // 第一個參數 index 指定了開始移除元素的位置，
    // 第二個參數 1 表示從 index 位置開始移除的元素數量。
    itemsCopy.splice(index, 1);

    // 最後使用 setTaskItems 更新狀態，將修改後的陣列設定為新的 taskItems
    // 不會包含被移除的元素
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>今日待辦事項</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.tasksWrapper}
          data={taskItems}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(index) => index.toString()}
        />
      </View>

      {/* 避免鍵盤覆蓋底部輸入欄，當鍵盤彈出時，輸入欄也會隨之上移 */}
      <KeyboardAvoidingView
        // 根據平台的不同，設定不同的 behavior 屬性。在 iOS 平台上，設定為 "padding"，在其他平台上設定為 "height"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          // 輸入框內到文字，當 handleAddTask() setTask(null) 執行時，會將這裡的輸入框清空
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        {/* TouchableOpacity 透過改變透明度來顯示按下的效果 */}
        {/* 與 button 不同，button 會有預設的樣式，而 TouchableOpacity 則是一個透明的容器，可以自由設計樣式 */}
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  flatListContainer: {
    height: "74%",
    marginTop: 10,
  },
  tasksWrapper: {
    paddingTop: 20,
    // 左右兩邊各 20px
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 70,
    marginLeft: 20,
    letterSpacing: 0.5,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
  },
});
