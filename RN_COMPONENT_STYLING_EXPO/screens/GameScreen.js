import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import CustomButton from '../components/CustomButton';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else {
        return rndNum;
    }
}

/*const renderListItem = (value, roundNum) => 
    (<View key={value} style={styles.listItem}>
        <BodyText>#{roundNum}</BodyText>
        <BodyText>{value}</BodyText>
    </View>);*/

const renderListItem = (listLength, itemData) => 
    (<View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>);

const GameScreen = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }

        Dimensions.addEventListener('change', updateLayout);

        return (
            Dimensions.removeEventListener('change', updateLayout)
        );
    });

    useEffect(() => {
        if (currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert(
                'Don\'t lie!',
                'You know this is wrong.',
                [{text: 'Sorry!', style: 'cancel'}]
            );
            return;
        }

        if (direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    let listContainerStyle = availableDeviceWidth > 300 ? styles.listContainer : styles.listContainerBig;

    if (availableDeviceHeight < 400) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Oponent's Guess</Text>
                <View style={styles.controls}>
                    <View style={styles.buttonViews}>
                        <CustomButton onPress={nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons name='md-remove' size={30} color='white' />
                        </CustomButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonViews}>
                        <CustomButton onPress={nextGuessHandler.bind(this, 'greater')} >
                            <Ionicons name='md-add' size={30} color='white' />
                        </CustomButton>
                    </View>
                </View>
                <View style={listContainerStyle}>
                    <FlatList 
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Oponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, ...{marginTop: availableDeviceHeight > 600 ? 50 : 3}}}>
                <View style={styles.buttonViews}>
                    <CustomButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name='md-remove' size={30} color='white' />
                    </CustomButton>
                </View>
                <View style={styles.buttonViews}>
                    <CustomButton onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name='md-add' size={30} color='white' />
                    </CustomButton>
                </View>
            </Card>
            <View style={listContainerStyle}>
                {/*FOR DIFFERENT STYLING METHODS CHECK LINE 81 THEN REPLACE THE STYLE WITH:
                    style={Dimensions.get('window').width > 300 ? styles.listContainer : styles.listContainerBig}
                */}
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>*/}
                <FlatList 
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems : 'center',
    },
    //buttonContainer : {
        //flexDirection : 'row',
        //justifyContent : 'space-evenly',
        //marginTop : 20,
        //marginTop : Dimensions.get('window').height > 600 ? 20 : 5,
        //width : 300,
        //maxWidth : '80%'
    //},
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '90%'
      },
    buttonViews : {
      width : '25%'
    },
    buttonText: {
        fontSize: 15
    },
    listItem: {
        borderColor: 'black', 
        borderWidth: 2,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        width: '100%'
    },
    listContainer: {
        flex: 1,
        //width: Dimensions.get('window').width > 300 ? '30%' : '60%'
        width: '30%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end'
    },
    controls : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        width : '80%'
    }
});

export default GameScreen;