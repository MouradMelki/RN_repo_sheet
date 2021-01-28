import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import CustomButton from '../components/CustomButton';
import NumberContainer from '../components/NumberContainer';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game Is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={3000}
                        // source={require('../assets/success.png')}
                        source={{uri: 'https://i.imgflip.com/396k03.png'}}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Your phone needed{' '}
                        <Text style={styles.highlight}>{props.numberOfRound}</Text> rounds{' '}
                        to guess the number{' '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                <CustomButton onPress={props.onRestart} >
                    <Text>NEW GAME</Text>
                </CustomButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 40,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 600 ? 12 : 22
    }
});

export default GameOverScreen;