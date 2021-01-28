import React, { useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game Is Over!</Text>
            <Text>Number of Rounds {props.numberOfRound}</Text>
            <Text>Number to guess was {props.userNumber}</Text>
            <Button title='NEW GAME' onPress={props.onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default GameOverScreen;