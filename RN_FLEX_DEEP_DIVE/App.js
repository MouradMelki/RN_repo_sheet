/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.container1}>
        <View
          style={{
            backgroundColor: 'red',
            alignItems: 'stretch',
            flexDirection: 'column-reverse',
            flex: 1
          }}>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 1
            }}>
              <Text>10</Text>
          </View>
          <View
            style={{
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1
            }}>
              <Text>11</Text>
            </View>
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
          <Text>2</Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2
          }}>
          <Text>3</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View
            style={{
              justifyContent: 'center',
              backgroundColor: 'powderblue'
            }}>
          <TextInput
            placeholder='Type here'
            style= {styles.input_text}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  container1: {
    padding: 0,
    flexDirection: 'row',
    width: '80%',
    height: '70%',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  container2: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'steelblue',
    height: '30%',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  input_text:{
    borderColor: 'black',
    borderWidth: 2,
    padding: 10
  }
});