import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList, 
    Pressable, 
    Image 
} from 'react-native';
import React, { useContext } from 'react';
import { WishlistContext } from '../wishlist';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function Favorites() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);
    const navigation = useNavigation();
  
    const handleProductPress = (product) => {
      navigation.navigate('Product Details', { id: product._id });
    };
  
    const handleDeleteIconPress = (product) => {
      removeFromWishlist(product._id);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={wishlist}
        renderItem={({ item }) => (
            <View style={styles.productContainer}>
                <Pressable onPress={() => handleProductPress(item)}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                </Pressable>
                    <Text>{item.name}</Text>
                <Pressable onPress={() => handleDeleteIconPress(item)}>
                    <Icon name="delete" size={24} color="red" />
                </Pressable>
            </View>
          )}
          keyExtractor={(item) => item._id}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
