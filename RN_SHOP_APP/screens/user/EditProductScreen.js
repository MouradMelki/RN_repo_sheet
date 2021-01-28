import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    Platform,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidity,
            [action.input]: action.isValid
        };

        let isFormValid = true;
        for (const key in updatedValidities) {
            isFormValid = isFormValid && updatedValidities[key];
        }

        return {
            inputValues: updatedValues,
            inputValidity: updatedValidities,
            formIsValid: isFormValid
        };
    }
    return state;
};

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    
    const productId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === productId)
    );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidity: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error){
            Alert.alert('Error!', 'An error has accurred please try again later.', [
                {text: 'OK'}
            ]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid Input', 'Please check the errors in the form', [
                {text: 'OK', style: 'default'}
            ])
            return;
        }

        setError(null);
        setIsLoading(true);
        
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(
                    productId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                ));
            } else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    + formState.inputValues.price
                ));
            }
            props.navigation.goBack();
        }
        catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, productId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

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

    return (
        <KeyboardAvoidingView
            style={{ flex:1 }}
            behavior='padding'
            keyboardVerticalOffset={60}    
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorMessage='Please enter a valid Title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue= {editedProduct ? editedProduct.title : ''}
                        initiallyValid= {!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorMessage='Please enter a valid image URL'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue= {editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid= {!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (<Input
                        id='price'
                        label='Price'
                        errorMessage='Please enter a valid Price'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        required
                        min= {0}
                    />)}
                    <Input
                        id='description'
                        label='Description'
                        errorMessage='Please enter a valid Description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines= {3}
                        initialValue= {editedProduct ? editedProduct.description : ''}
                        initiallyValid= {!!editedProduct}
                        onInputChange={inputChangeHandler}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMsg: {
        fontFamily: 'open-sans-bold',
        color: 'red',
        fontSize: 20,
        padding: 20,
        textAlign: 'center'
    }
});

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    const pid = navData.navigation.getParam('productId');
    let title;
    if (pid) {
        title = 'Edit ' + navData.navigation.getParam('itemTitle');
    } else {
        title = 'New Product'
    }
    return {
        headerTitle: title,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Add'
                        iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                        onPress={submitFn}
                    />
                </HeaderButtons>
            );
        }
    };
};

export default EditProductScreen;