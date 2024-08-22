import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const DetailsScreen = ({route, navigation}) => {
  const data = route.params.product;

  const addToCart = () => {
    navigation.navigate('AddToCartScreen', {data});
  };

  console.log(data);
  return (
    <ScrollView style={styles.container}>
     
      <TouchableOpacity
        style={{fontSize: 18, width: 60, fontWeight: '700'}}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Image
          source={require('../assets/backArrow.png')}
          style={{width: 50, height: 30}}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 50,
        }}>
        <Image source={{uri: data.imageUrl}} style={styles.productImage} />
      </View>
      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{data.productName}</Text>
        <Text style={styles.productPrice}>${data.price}</Text>

        <Text style={styles.productDescription}>{data.description}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={addToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buyNowButton]}
            onPress={() =>
              navigation.navigate('AddressScreen', {
                data: [data],
              })
            }>
            <Text style={[styles.buttonText, styles.buyNowButtonText]}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '50%',
    height: 300,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -3},
    shadowRadius: 5,
    elevation: 8,
    // height:height*1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6A88',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FF6A88',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2 - 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#FF9A8B',
  },
  buyNowButtonText: {
    color: '#fff',
  },
});

export default DetailsScreen;
