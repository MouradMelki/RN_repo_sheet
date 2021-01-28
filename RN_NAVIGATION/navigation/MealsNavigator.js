import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MealDetailScreen from '../screens/MealDetailScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'Meals'
};

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, {
    initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOption,
    mode: 'modal'
});

const FavNavigator = createStackNavigator({
    Favorites:  FavoriteScreen,
    MealDetail: MealDetailScreen
}, {
    initialRouteName: 'Favorites',
    defaultNavigationOptions: {
        ...defaultStackNavOption,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.accentColor : 'white'
        }},
    mode: 'card'
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            activeColor: Colors.accentColor,
            tabBarLabel:
                Platform.OS === 'android'
                ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>
                : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            //tabBarLabel: 'Favorite',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor,
            activeColor: Colors.primaryColor,
            tabBarLabel: 
                Platform.OS === 'android'
                ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
                : 'Favorites'
        }
    }
};

const MealsFavTabNavigator = 
    Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, 
        {
            shifting: true,
            barStyle: {
                backgroundColor: Colors.primaryColor
            }
        }
    )
    : createBottomTabNavigator(tabScreenConfig, 
        {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                },
                activeTintColor: Colors.accentColor
            }
        }
    );

const FilterNavigator = createStackNavigator({
    Filters: {
        screen: FiltersScreen
    }
}, {
    //navigationOptions: {
        //drawerLabel: 'Filters!'
    //},
    defaultNavigationOptions: defaultStackNavOption
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FilterNavigator
    }
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);