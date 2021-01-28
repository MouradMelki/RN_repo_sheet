import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    ImageBackground
} from 'react-native';
import DefaultText from './DefaultText';

const MealItems = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.mealItem}>
            <TouchableCmp onPress={props.onSelectMeal} >
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {props.title}    
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    mealRow: {
        flexDirection: 'row'
    },
    mealItem: {
        width: '100%',
        height: 200,
        backgroundColor: '#D4DADE',
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 7
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    }
});

export default MealItems;