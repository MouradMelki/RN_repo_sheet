import React, { useEffect, useState, useCallback } from 'react';
import {
    FlatList,
    View,
    Text,
    Platform,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.accent}
                />
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>No orders found!</Text>
                <Text style={styles.message}>Start ordering something!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={orders}
            renderItem={itemData => 
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: Colors.accent
    }
});

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => {
            return(
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Drawer'
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            );
        },
    };
};

export default OrdersScreen;