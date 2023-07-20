import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Pressable,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useGetProductQuery } from '../store/apiSlice';
import { WishlistContext } from '../wishlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ProductDetails({route}) {
    const id = route.params.id;    
    const { data, error, isLoading } = useGetProductQuery(id);  
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { addToWishlist, wishlist } = useContext(WishlistContext);
    const [isInWishlist, setIsInWishlist] = useState(false);
  
    
    useEffect(() => {
        if (error) {
          console.error("Error fetching the product:", error);
        }
    
        if (data) {
          const product = data.data;
          setIsInWishlist(wishlist.some((item) => item._id === product._id));
        }
      }, [data, error, wishlist]);
    

      const addToCart = () => {
        dispatch(cartSlice.actions.addCartItem({ product: data?.data }));
      };
      
      const handleAddToWishlist = () => {
        addToWishlist(data?.data);
        setIsInWishlist(!isInWishlist);
      };
    
      if (isLoading) {
        return <ActivityIndicator />;
      }
    
      if (error) {
        return <Text>Error fetching the product: {error.message}</Text>;
      }
    
      const product = data?.data;

  return (
    <View>
        <ScrollView>
            {/* image carousel */}

            <FlatList
                data={product.images}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />

            <View style={{padding: 20}}>

                {/* title */}
                <View style={styles.titleWrapper} >
                    <Text style={styles.title}>{product.name}</Text>
                    <Icon 
                        style={styles.favoritesIcon} 
                        name={isInWishlist ? 'heart' : 'heart-outline'} 
                        size={30} 
                        color={isInWishlist ? 'red' : 'gray'} 
                        onPress={handleAddToWishlist}
                    />

                </View>

                {/* price */}

                <Text style={styles.price}>$ {product.price}</Text>

                {/* description */}

                <Text style={styles.description}>{product.description}</Text>

            </View>
        </ScrollView>

            {/* add to cart button */}
        <Pressable 
            style={styles.button}
            onPress={addToCart}
        >
            <Text style={styles.buttonText}>ADD TO CART</Text>
        </Pressable>

            {/* navigation icon */}
      
    </View>
  );
}

const styles = StyleSheet.create({
    titleWrapper: { 
        flexDirection: 'row' 
        
    },
    title: {
        fontSize: 34, 
        fontWeight: 500,
        marginVertical: 10,
        
    }, 
    favoritesIcon: {
        margin: 10,
        alignSelf: 'center',
    }, 
    price: {
        fontSize: 16, 
        fontWeight: 500,
    }, 
    description: {
        fontSize: 16, 
        fontWeight: 300,
        marginVertical: 10,
        lineHeight: 30,
        letterSpacing: 1,
    },
    button: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 500,
        fontSize: 16
    }

});
