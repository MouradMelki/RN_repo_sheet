import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import MealList from '../components/MealList';

const FavoriteScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No Favorite Meals Found. Start Adding Some!</DefaultText>
            </View>
        );
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    );
};

FavoriteScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft:  () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                    navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    content: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
    }
});

export default FavoriteScreen;