import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Weather  from './components/meteo';
import ToDoApp from './components/todo';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ToDoApp/> */}
      <Weather/>
    </SafeAreaView>
  );
};

export default App;