import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
// import CocktailDetails from './pages/CocktailDetails';
// import Favorites from './pages/Favorites';
// import CategoryPage from './pages/CategoryPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CocktailDetails" component={CocktailDetails} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="CategoryPage" component={CategoryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;