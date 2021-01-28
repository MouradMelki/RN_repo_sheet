import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

const Cart = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowRadius: 8,
        shadowOpacity: 0.3,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default Cart;