import React from 'react';
import {Text, View} from 'react-native';
import RootNavigation from './src/component/RootNavigation';

export default function App() {
  return <RootNavigation/>
}



// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// const App = () => {
//   const [firebaseInitialized, setFirebaseInitialized] = useState(false);

//   useEffect(() => {
//     // Check if Firebase is initialized
//     const checkFirebaseConnection = async () => {
//       try {
//         await auth().signInAnonymously(); // Trying anonymous sign-in as a test
//         setFirebaseInitialized(true);
//         console.log('Firebase is connected');
//       } catch (error) {
//         console.log('Firebase connection failed:', error);
//       }
//     };

//     checkFirebaseConnection();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {firebaseInitialized ? (
//         <Text>Firebase is connected</Text>
//       ) : (
//         <Text>Checking Firebase connection...</Text>
//       )}
//     </View>
//   );
// };

// export default App;
