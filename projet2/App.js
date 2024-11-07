import React from 'react';
import { SafeAreaView } from 'react-native';

import ToDoApp from './components/todo';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToDoApp />
    </SafeAreaView>
  );
};

export default App;