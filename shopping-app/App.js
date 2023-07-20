import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { WishlistProvider } from './src/wishlist';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <Provider store={store} >
      <WishlistProvider>
        <View style={styles.container}>
          <StripeProvider publishableKey='pk_test_kvurvjvMtAG4op3cyHst0URm'>

             <Navigation />

          </StripeProvider>
          
          <StatusBar style="auto" />
        </View>
      </WishlistProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',       
    
  },
  
  
})
