import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    Button,
    Platform,
    Alert,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as userActions from '../../store/actions/products';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const selectedItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                itemTitle: title,
                productId: id
            }
        });
    };

    useEffect(() => {
        if (error){
            Alert.alert('Error!', 'An error has accurred please try again later.', [
                {text: 'OK'}
            ]);
        }
    }, [error]);

    const deleteHandle = (id) => {
        Alert.alert('Are you sure?', 'Do you want to delete this item?',[
            {text: 'No', style: 'default '},
            {text: 'Yes', style: 'destructive', onPress: async () => {
                setError(null);
                setIsLoading(true);
                try {
                    await dispatch(userActions.deleteProduct(id));
                }
                catch (err) {
                    setError(err.message);
                }
                setIsLoading(false)
            }}
        ])
    };

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

    if (userProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.message}>No products create!</Text>
                <Text style={styles.message}>Start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={userProducts}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectedItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        color={Colors.button}
                        title='Edit' 
                        onPress={() => {
                            selectedItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    />
                    <Button
                        color={Colors.button}
                        title='Delete'
                        onPress={deleteHandle.bind(this, itemData.item.id)}
                    />
                </ProductItem>
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

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => {
            return (
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
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Add'
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        onPress={() => {
                            navData.navigation.navigate({
                                routeName: 'EditProduct'
                            });
                        }}
                    />
                </HeaderButtons>
            );
        }
    }
};

export default UserProductsScreen;