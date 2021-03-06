import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const cartTotal = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCart = [];
        for (const key in state.cart.items) {
            transformedCart.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }

        return transformedCart.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotal));
        setIsLoading(false);
    };
    
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amount}>${Math.round(cartTotal.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading
                    ? <ActivityIndicator size='small' color={Colors.accent} /> 
                    : <Button
                        color={Colors.button}
                        title='Order Now'
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler} />
                }
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                        deletable
                    />
                }
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
});

export default CartScreen;