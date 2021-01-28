import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const SIGNUP = 'SIGNUP';

const formReducer = (state, action) => {
    if (action.type === SIGNUP) {
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

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(true);
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidity: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if(error) {
            Alert.alert('An error has occured', error, [{text: 'OK'}]);
        }
    }, [
        error
    ]);

    const authHandler = async () => {
        let action;
        if ( isSignup ){
            action = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: SIGNUP,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior='height'
            style={styles.screen}
            keyboardVerticalOffset={40}>
            <LinearGradient colors={['#FFCFC5', '#F2F3BC']}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView keyboardShouldPersistTaps='handled'>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorMessage='Please enter a valid email address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            minLength={5}
                            required
                            autoCapitalize='none'
                            errorMessage='Please enter a valid password address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={isSignup ? 'SignUp' : 'Login'}
                                color={Colors.button}
                                onPress={authHandler}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            {
                                isLoading ? (
                                <ActivityIndicator
                                    size='small'
                                    color={Colors.accent}
                                />
                                ) : (
                                <Button
                                    title={`Switch to ${!isSignup ? 'Sign Up' : 'LogIn'}`}
                                    color={Colors.accent}
                                    onPress={() => {
                                        setIsSignup(prevState => !prevState);
                                    }}
                                />)
                            }
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

AuthScreen.navigationOptions = navData => {
    const title = 'Sign In/Up';
    return {
        headerTitle: title
    };
};

export default AuthScreen;