import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux';
import { selectNumberOfItems } from './store/cartSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductsList from './screens/ProductsList'
import ProductDetails from './screens/ProductDetails'
import ShoppingCart from './screens/ShoppingCart'
import TrackOrder from './screens/TrackOrder';
import Favorites from './screens/Favorites';

const Stack = createNativeStackNavigator();

export default function Navigation() {

  const numberOfItems = useSelector(selectNumberOfItems);

  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: 'white'
            }
          }}
        >
          
          <Stack.Screen 
            name="Products" 
            component={ProductsList}
            options= {({ navigation }) => ({
              headerRight: () => (
                <Pressable 
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('Cart')}
                >
                  <Icon name='cart' size={18} color='gray' />
                  <Text style={{ marginLeft: 5, fontWeight: 500, }} >
                    {numberOfItems}
                  </Text>
                </Pressable>),
              headerTitleAlign: 'center',
              headerLeft: () => (
                <View style={{ flexDirection: 'row', gap: 10}}>
                  <Icon
                    onPress={() => navigation.navigate('Track Order')}
                    name='truck-delivery-outline'                
                    size={22}
                    color="gray"
                  />
                  <Icon 
                    onPress={() => navigation.navigate('Favorites')}
                    name='heart' 
                    size={22} 
                    color='gray' 
                  />
                  
                </View>
                
              ),
            })         
          } 

          />
          <Stack.Screen 
            name="Product Details" 
            component={ProductDetails} 
            options= {({ navigation }) => ({
              headerRight: () => (
                <Pressable 
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('Cart')}
                >
                  <Icon name='cart' size={18} color='gray' />
                  <Text style={{ marginLeft: 5, fontWeight: 500, }} >
                    {numberOfItems}
                  </Text>
                </Pressable>),
              headerTitleAlign: 'center',
              presentation: 'modal',
              headerLeft: () => (
                <View style={{ flexDirection: 'row', gap: 10}}>
                  <Icon
                    onPress={() => navigation.navigate('Track Order')}
                    name='truck-delivery-outline'                
                    size={22}
                    color="gray"
                  />
                  <Icon 
                    onPress={() => navigation.navigate('Favorites')}
                    name='heart' 
                    size={22} 
                    color='gray' 
                  />
                  <Icon 
                    onPress={() => navigation.navigate('Products')}
                    name='home' 
                    size={22} 
                    color='gray' />
                </View>
                
              ),
            })         
          } 
          />
          <Stack.Screen name="Cart" component={ShoppingCart} />
            
          <Stack.Screen name="Track Order" component={TrackOrder} />
          <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

