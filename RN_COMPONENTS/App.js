/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

let test_var = 0;

function getMax(arr, prop) {
  var max;
  for (var i=0 ; i<arr.length ; i++) {
      if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
          max = arr[i];
  }
  return max;
}

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  var latest_goal = getMax(courseGoals, 'key');
  console.log('RE RENDERING COMPONENTS');
  console.log(courseGoals);
  if(courseGoals.length > 0){
    test_var = latest_goal.key;
  }

  const addGoalHandler = goalTitle => {
    console.log(goalTitle);
    if(goalTitle.length === 0) {
      return;
    }
    setCourseGoals(currentGoals =>
      [
        ...currentGoals,
        { key: (++test_var).toString(), value: goalTitle }
      ]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    console.log('TO BE DELETED ' + goalId);
    console.log(courseGoals);
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.key !== goalId);
    });
  }

  const cancelAddModeHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)} />
      <GoalInput visibility={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelAddModeHandler}/>
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={courseGoals}
        renderItem={itemData => <GoalItem id={itemData.item.key} onDelete={removeGoalHandler} title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});