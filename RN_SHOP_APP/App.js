import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // should be removed when deploying the app
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as font from 'expo-font';
import ReduxThunk from 'redux-thunk'

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import NavigatorContainer from './navigation/NavigationContainer';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const fetchFonts = async () => {
  await font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => {setFontLoaded(true)}}
      onError={(err) => {console.log(err)}}
    />
  }

  return (
    <Provider store={store}>
      <NavigatorContainer />
    </Provider>
  );
}
