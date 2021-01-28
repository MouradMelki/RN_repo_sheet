import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';

import Colors from '../constants/colors';

const TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default TitleText;