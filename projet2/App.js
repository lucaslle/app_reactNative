import React from 'react';
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