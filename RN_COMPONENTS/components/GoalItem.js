import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';

const GoalItem = props => {
    return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
        <View style={styles.listItem}>
            <Text>{props.title}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem:{
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
      }
});

// TouchableNativeFeedback is only used for android (it's native to android only will not work with IOS)

export default GoalItem;