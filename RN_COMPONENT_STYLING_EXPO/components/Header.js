import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';

import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = props => {
    return(
        <View 
            style={{
                ...styles.headerBase, 
                ...Platform.select({
                    ios: styles.headerIOS, 
                    android: styles.headerAndroid
                    })
                }}
            >
            <TitleText>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase : {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: '#FFF5F2',
        borderColor: Colors.primary,
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
        borderColor: 'white',
        borderBottomWidth: 1
    }
});

export default Header;