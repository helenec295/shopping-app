import { 
    Text,
    FlatList,
    View,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native'
import React from 'react'
import CartListItem from '../components/CartListItem'
import { useDispatch, useSelector } from 'react-redux'
import { 
    selectDeliveryPrice, 
    selectSubtotal, 
    selectTotal, 
    cartSlice
} from '../store/cartSlice'
import { 
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from '../store/apiSlice'
import { useStripe } from '@stripe/stripe-react-native';


export default function ShoppingCart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
    const ShoppingCartTotals = () => (
      <View style={styles.totalsContainer}>
        <View style={styles.row}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{subtotal} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Shipping</Text>
          <Text style={styles.text}>{deliveryFee} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Total</Text>
          <Text style={styles.textBold}>{total} US$</Text>
        </View>
      </View>
    );

    const onCheckout = async () => {
        // 1. Create a payment intent
        const response = await createPaymentIntent({
          amount: Math.floor(total * 100),
        });
        if (response.error) {
          Alert.alert('Something went wrong');
          return;
        }
    
        // 2. Initialize the Payment sheet
        const initResponse = await initPaymentSheet({
          merchantDisplayName: 'helen evenchen',
          paymentIntentClientSecret: response.data.paymentIntent,
        });

        if (initResponse.error) {
          console.log(initResponse.error);
          Alert.alert('Something went wrong');
          return;
        }
    
        // 3. Present the Payment Sheet from Stripe
        const paymentResponse = await presentPaymentSheet();
    
        if (paymentResponse.error) {
          Alert.alert(
            `Error code: ${paymentResponse.error.code}`,
            paymentResponse.error.message
          );
          return;
        }
    
        // 4. If payment ok -> create the order
        onCreateOrder();
    };
    
    const onCreateOrder = async () => {
        
        
        const result = await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
            name: 'Helen',
            address: 'Glen Rock',
            email: 'helen@helen.com'
             }
        });
      
        if (result.data?.status === 'OK') {
          Alert.alert(
            'Order has been submitted',
            `Your order reference is: ${result.data.data.ref}`
          );
          dispatch(cartSlice.actions.clear());
        }
      };

  return (
    <>
        <FlatList 
            data={cartItems}
            renderItem={({item}) => <CartListItem cartItem={item}/> }
            ListFooterComponent={ShoppingCartTotals}
        />
        <Pressable onPress={onCheckout} style={styles.button}>         
            <Text style={styles.buttonText}>
                CHECKOUT
                {isLoading && <ActivityIndicator />}
            </Text>
        </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
        
    },
    text: {
        fontSize: 16,
        color: 'gray'
    },
    textBold: {
        fontSize: 16,
        fontWeight: 500,
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
})