import React from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CartItem = props => {
    let TouchableCmp = TouchableOpacity;
    /*if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }*/

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}{' '}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                {props.deletable && <View style={styles.deleteButton}>
                    <View style={styles.touchable}>
                        <TouchableCmp onPress={props.onRemove} useForeground>
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                size={23}
                                color='#CC3399'
                            />
                        </TouchableCmp>
                    </View>
                </View>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;