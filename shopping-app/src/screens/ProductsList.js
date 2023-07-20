import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  Pressable, 
  ActivityIndicator 
} from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { productSlice } from '../store/productSlice';
import { useGetProductsQuery } from '../store/apiSlice';


export default function ProductsList({ navigation }) {

  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching products: {error.error}</Text>;
  }

  const products = data.data;

  
  return (
      <FlatList 
        data={products}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.imageContainer} 
            onPress={() => {
              // dispatch(productSlice.actions.setSelectedProduct(item.id))
              
              navigation.navigate('Product Details', { id: item._id });
            
            }}
          >
            <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain'/>         
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />
    
  )
}


const styles = StyleSheet.create({
    flatList: {
      flexGrow: 1,    
    },
    imageContainer: {
      width: '50%',
      aspectRatio: 1,
      padding: 20
    },
    image: {
      width: '100%', 
      aspectRatio: 1, 
      
      
    }
  });
  