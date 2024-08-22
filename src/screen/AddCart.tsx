import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

const {width} = Dimensions.get('window');

const AddToCartScreen = ({route, navigation}) => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const product = route.params.data;
    if (product) {
      setCartItems(prevItems => {
        const newItems = {...prevItems};
        if (newItems[product.id]) {
          // If the product already exists, just update the quantity
          newItems[product.id].quantity += 1;
        } else {
          // Add new product to the cart
          newItems[product.id] = {
            id: product.id,
            productName: product.productName,
            price: product.price || 0, // Default to 0 if price is undefined
            quantity: 1,
            imageUrl: product.imageUrl,
          };
        }
        return newItems;
      });
    }
  }, [route.params.data]);

  const updateQuantity = (id, change) => {
    setCartItems(prevItems => {
      const newItems = {...prevItems};
      if (newItems[id]) {
        newItems[id].quantity = Math.max(newItems[id].quantity + change, 1);
      }
      return newItems;
    });
  };

  const totalPrice = Object.values(cartItems).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const removeIdFromItems = items => {
    return Object.values(items).map(({id, ...rest}) => rest);
  };

  console.log(cartItems,'90909090')

  const renderItem = ({item}) => (
    <TouchableOpacity key={item.id} style={styles.cartItem}>
      <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <View>
          <Text style={styles.itemName}>{item.productName}</Text>
          <Text style={styles.itemPrice}>
            ${item.price ? item.price : '0.00'}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              item.quantity === 1 && styles.disabledButton,
            ]}
            onPress={() => updateQuantity(item.id, -1)}
            disabled={item.quantity === 1}>
            <Image
              source={require('../assets/minus.png')}
              style={{width: 20, height: 4, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}>
            <Image
              source={require('../assets/pluse.png')}
              style={{width: 20, height: 20, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Cart Items */}
      <FlatList
        data={Object.values(cartItems)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartContainer}
      />

      {/* Total Price */}
      <View style={{marginHorizontal: 30}}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.checkoutButton]}
          onPress={() => {
            const itemsWithoutId = removeIdFromItems(cartItems);
            navigation.navigate('AddressScreen', {
              data: itemsWithoutId,
            });
          }}>
          <Text style={styles.buttonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cartContainer: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6A88',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#FF6A88',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6A88',
    marginTop: 10,
  },
  buttonsContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#FF6A88',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#FF9A8B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCartScreen;
