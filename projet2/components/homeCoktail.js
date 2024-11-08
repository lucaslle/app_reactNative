import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CocktailCard from '../components/CocktailCard';
import { getCocktails } from '../services/cocktailAPI';

const Home = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = async () => {
    const data = await getCocktails();
    setCocktails(data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <CocktailCard
            cocktail={item}
            onPress={() => navigation.navigate('CocktailDetails', { cocktail: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;