import React, { useEffect, useCallback } from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText style={{fontFamily: 'open-sans'}}>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {
    const { navigation } = props;

    const mealId = navigation.getParam('mealId');
    const filteredMeals = useSelector(state => state.meals.meals);
    const currentMealIsFavorite = useSelector(state => 
        state.meals.favoriteMeals.some(
            meal => meal.id === mealId
        )
    );
    const selectedMeal = filteredMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandles = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        //navigation.setParams({mealTitle: selectedMeal.title});
        props.navigation.setParams({toggleFav: toggleFavoriteHandles});
    }, [toggleFavoriteHandles]);

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavorite});
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image 
                source={{uri: selectedMeal.imageUrl}}
                style={styles.image}
            />
            <View style={styles.details}>
                <DefaultText style={styles.detailsText}>{selectedMeal.duration}m</DefaultText>
                <DefaultText style={styles.detailsText}>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText style={styles.detailsText}>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(
                ingredients => (
                    <ListItem key={ingredients}>{ingredients}</ListItem>
                )
            )}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(
                steps => (
                    <ListItem key={steps}>{steps}</ListItem>
                )
            )}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Favorite" 
                    iconName={isFavorite  ? "ios-star" : "ios-star-outline"}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image : {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    detailsText: {
        color: Colors.primaryColor
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding:10
    }
});

export default MealDetailScreen;