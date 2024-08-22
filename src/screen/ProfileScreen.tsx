import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setImageUri(savedImageUri);
        }

        const savedName = await AsyncStorage.getItem('userName');
        if (savedName) {
          setName(savedName);
          setEditName(savedName);
        }

        const savedEmail = await AsyncStorage.getItem('userEmail');
        if (savedEmail) {
          setEmail(savedEmail);
        }
      } catch (error) {
        console.error('Failed to load data from AsyncStorage:', error);
      }
    };

    loadData();
  }, [email]);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.errorMessage) {
        Alert.alert('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        setImageUri(source);

        try {
          await AsyncStorage.setItem('profileImage', source);
        } catch (error) {
          console.error('Failed to save image to AsyncStorage:', error);
        }
      }
    });
  };

  const handleSaveName = async () => {
    try {
      await AsyncStorage.setItem('userName', editName);
      setName(editName);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save name to AsyncStorage:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Remove specific keys from AsyncStorage
      await AsyncStorage.multiRemove(['profileImage', 'userName', 'userEmail']);
      
      // Optionally clear the state variables
      setImageUri(null);
      setName('');
      setEmail('');
  
      // Navigate to the login screen
      navigation.navigate('loginScreen');
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#FF9A8B', '#FF6A88', '#FF99AC']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
      </LinearGradient>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={imageUri ? {uri: imageUri} : null}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={editName}
              onChangeText={setEditName}
              onSubmitEditing={handleSaveName}
            />
            <TouchableOpacity onPress={handleSaveName}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nameContainer}>
            <View
              style={{
                width: '35%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text style={styles.profileName}>{name || 'John Doe'}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('OrderHistoryScreen')}>
          <Text style={styles.optionText}>Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FF6A88',
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    // backgroundColor:'pink'
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#FF6A88',
    width: 200,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  saveButton: {
    color: '#FF6A88',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    color: '#FF6A88',
    fontSize: 18,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;
