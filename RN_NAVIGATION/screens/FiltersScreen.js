import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FilterSwitch = props => {
    return (
        <View style={styles.filteContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{true: Colors.accentColor}}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'}
                value={props.filter}
                onValueChange={newValue => props.setFilter(newValue)}
            />
        </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarianFree] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten Free' filter={isGlutenFree} setFilter={setIsGlutenFree} />
            <FilterSwitch label='Lactose Free' filter={isLactoseFree} setFilter={setIsLactoseFree} />
            <FilterSwitch label='Vegan' filter={isVegan} setFilter={setIsVegan} />
            <FilterSwitch label='Vegetarian' filter={isVegetarian} setFilter={setIsVegetarianFree} />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filters',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Save" 
                    iconName="ios-save" 
                    onPress={() => {
                        navData.navigation.getParam('save')();
                    }}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        alignItems : 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;