import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { LinearGradient } from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth().currentUser; // Get the current user

  if (!user) {
    Alert.alert('Error', 'User not authenticated');
    return null;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await firestore()
          .collection('addresses')
          .orderBy('createdAt', 'desc')
          .get();
        const orderList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter orders where userId matches the current user's ID
        const filterData = orderList.filter(item => item.userId === user.uid);
        setOrders(filterData);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View>
        <Text style={styles.orderTotal}>Total: ${item.price}</Text>
        <Text style={styles.orderStatus}>Status: {item.state}</Text>
      </View>
      {item.img ? (
        <Image source={{ uri: item.img }} style={styles.orderImage} />
      ) : (
        <Text>No Img Show</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF9A8B', '#FF6A88']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('../assets/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={styles.emptyView} />
      </LinearGradient>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6A88" style={styles.loader} />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  backArrow: {
    width: 50,
    height: 30,
    tintColor: 'white',
  },
  emptyView: {
    width: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    padding: 20,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  orderImage: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 14,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
  },
});

export default OrderHistoryScreen;
