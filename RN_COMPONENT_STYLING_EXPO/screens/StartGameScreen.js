import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import CustomButton from '../components/CustomButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        }
    
        Dimensions.addEventListener('change', updateLayout);

        return (
            Dimensions.removeEventListener('change', updateLayout)
        );
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                'Invalid Number!',
                'The entered number should be between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed) {
    confirmedOutput = 
        <Card style={styles.confirmContainer}>
            <BodyText>You Selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <CustomButton onPress={() => props.onStartGame(selectedNumber)} >
                <Text>START GAME</Text>
            </CustomButton>
        </Card>;
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-10}>
                <TouchableWithoutFeedback onPress={() =>{
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input 
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{width : buttonWidth}}>
                                    <Button title="Reset" color={Colors.secondary} onPress={resetInputHandler} />
                                </View>
                                <View style={{width : buttonWidth}}>
                                    <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title : {
        marginVertical: 10
    },
    inputContainer : {
        width : '80%',
        //maxWidth : '80%',
        maxWidth : '95%',
        minWidth : 150,
        alignItems : 'center',
        shadowColor : '#460000',
        padding : 10
    },
    buttonContainer : {
        flexDirection : 'row',
        width : '100%', 
        justifyContent : 'space-evenly',
        paddingHorizontal : 15
    },
    //buttonViews : {
      //width : '40%'
      //width : Dimensions.get('window').width / 3
    //},
    input : {
        height: 30,
        width: 50,
        textAlign: 'center'
    },
    confirmContainer: {
        marginTop : 20,
        shadowColor : '#460000',
        alignItems : 'center'
    }
});

export default StartGameScreen;