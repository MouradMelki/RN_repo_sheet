import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

import Colors from '../constants/colors';

const CustomButton = props => {
    let ButtonContainer = TouchableOpacity;

    if (Platform.Version >= 21) {
        ButtonContainer = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonContainer activeOpacity={0.6} onPress={props.onPress}>
                <View style={{...styles.button, ...props.style}}>
                    <Text style={{...styles.buttonText, ...props.style}}>{props.children}</Text>
                </View>
            </ButtonContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 18,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign: 'center'
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    }
});

export default CustomButton;