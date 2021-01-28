import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity
} from 'react-native';

import Colors from '../constants/colors';

const CustomButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...props.style}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
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
    }
});

export default CustomButton;