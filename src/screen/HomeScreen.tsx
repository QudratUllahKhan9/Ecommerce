import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = firestore().collection('products');
        const snapshot = await productCollection.get();
        const productData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products: ', error);
        Alert.alert('Error', 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6A88" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  const renderProduct = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('ProductDatilsScreen', {product: item})
      }>
      <Image
        source={{uri: item.imageUrl}} // Assuming you have `imageUrl` field
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.category}
      onPress={() =>
        navigation.navigate('ProductDatilsScreen', {product: item})
      }>
      <Image
        source={{uri: item.imageUrl}} // Assuming you have `imageUrl` field
        style={styles.productImageCategory}
      />
      <Text style={styles.productName}>{item.productName}</Text>
      {/* <Text style={styles.productPrice}>${item.price}</Text> */}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#FF9A8B', '#FF6A88', '#FF99AC']}
        style={styles.header}>
        <View>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Shop the Latest</Text>
            <TouchableOpacity style={styles.cartButton}></TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>Best Deals of the Week</Text>
        </View>
        <View></View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={products}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productRow}
          />
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.featured}>
        <Text style={styles.sectionTitle}>Products</Text>

        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.productRowProduct}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: '#FF6A88',
    padding: 8,
    borderRadius: 20,
  },
  categories: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  category: {
    marginRight: 15,
    alignItems: 'center',
  },
  categoryShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  featured: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
  },
  productRowProduct: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor:'pink',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  productCard: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    // padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    transform: [{scale: 1.02}],
    margin: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginBottom: 15,
    margin: 5,
  },

  productImageCategory: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginBottom: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#FF6A88',
    fontWeight: 'bold',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});

export default HomeScreen;
