/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  FlatList
} from 'react-native';

let test_var = 0;

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  }

  const addGoalHandler = () => {
    setCourseGoals(currentGoals =>
      [
        ...currentGoals, 
        {key: (test_var++).toString(), value: enteredGoal}
      ])
  }
  _renderItem = ({itemData}) => (
    <View tyle={styles.listItem}>
      <Text>{itemData.item.value}</Text>
    </View>
 );
  return(
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Course Goal" 
            style={styles.input} 
            onChangeText={goalInputHandler}
            value={enteredGoal}/>
        <Button title="ADD" onPress={addGoalHandler}/>
      </View>
      <FlatList 
        keyExtractor={(item, index) => item.key}
        data={courseGoals.slice(0).reverse()}
        renderItem={this._renderItem}
      /> 
    </View>
  );
}
/* No need to set a key */
/*
{itemData => ( 
          <View style={styles.listItem}>
            <Text>{itemData.item.value}</Text>
          </View>
        )}
<ScrollView inverted> 
        {courseGoals.slice(0).reverse().map((goal) => <View key={goal} style={styles.listItem}>
                                      <Text>{goal}</Text>
                                   </View>)}
</ScrollView>*/
const styles = StyleSheet.create({
  screen: {
    padding: 80
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem:{
    padding: 10,
    backgroundColor: '#CCC',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10
  }
});