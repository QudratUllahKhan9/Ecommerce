import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import LinearGradient from 'react-native-linear-gradient';

const AddressScreen = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Extract the product data passed from the previous screen
  const data = route.params?.data || [];
  console.log(data);

  const handleSubmit = async () => {
    const user = auth().currentUser; // Get the current user
    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    if (
      name.trim() &&
      phone.trim() &&
      street.trim() &&
      city.trim() &&
      state.trim() &&
      postalCode.trim()
    ) {
      try {
        const promises = data.map(item => {
          const validData = {
            userId: user.uid, // Include the user ID
            name,
            phone,
            street,
            city,
            state,
            postalCode,
            img: item.imageUrl || '', // Use item data
            ProductName: item.productName || '', // Use item data
            price: parseFloat(item.price) || 0, // Use item data
            quantity: item.quantity || 1, // Use item data
            createdAt: firestore.FieldValue.serverTimestamp(),
          };

          return firestore().collection('addresses').add(validData);
        });

        await Promise.all(promises);

        setModalVisible(true);
      } catch (error) {
        Alert.alert('Error', 'Failed to submit data: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.goBack(); // Optionally navigate back after closing the modal
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF9A8B', '#FF6A88']} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/backArrow.png')}
            style={{tintColor: 'white', width: 50, height: 30}}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          keyboardType="number-pad"
          value={postalCode}
          onChangeText={setPostalCode}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalMessage}>
              Your address has been added successfully.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#FF6A88',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF6A88',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
