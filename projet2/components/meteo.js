import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = '98a8608e0498c0008fa4c08b567f6cd7';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission de localisation refusée');
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      const { latitude, longitude } = userLocation.coords;

      const weatherData = await getCurrentWeather(latitude, longitude);
      setCurrentWeather(weatherData);

      const forecastData = await getFiveDayForecast(latitude, longitude);
      setForecast(groupForecastByDay(forecastData));

      setLoading(false);
    })();
  }, []);

  const getCurrentWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${API_URL}weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
          lang: 'fr',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la météo actuelle:', error);
    }
  };

  const getFiveDayForecast = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${API_URL}forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
          lang: 'fr',
        },
      });
      return response.data.list;
    } catch (error) {
      console.error('Erreur lors de la récupération des prévisions:', error);
    }
  };

  const groupForecastByDay = (forecastData) => {
    return forecastData.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('fr-FR', { weekday: 'long', month: 'short', day: 'numeric' });
      if (!acc[day]) acc[day] = [];
      acc[day].push(item);
      return acc;
    }, {});
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Météo actuelle</Text>
      {currentWeather && (
        <View style={styles.currentWeatherContainer}>
          <Text style={styles.cityName}>{currentWeather.name}</Text>
          <Text style={styles.currentTemp}>{currentWeather.main.temp}°C</Text>
          <Text style={styles.currentDescription}>{currentWeather.weather[0].description}</Text>
        </View>
      )}

      <Text style={styles.header}>Prévisions à 5 jours</Text>
      <FlatList
        data={Object.keys(forecast)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedDay(selectedDay === item ? null : item)}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayText}>{item}</Text>
              {selectedDay === item && (
                <FlatList
                  data={forecast[item]}
                  keyExtractor={(forecastItem) => forecastItem.dt.toString()}
                  renderItem={({ item: forecastItem }) => (
                    <View style={styles.forecastDetail}>
                      <Text style={styles.forecastTime}>Heure : {new Date(forecastItem.dt * 1000).toLocaleTimeString()}</Text>
                      <Text style={styles.forecastTemp}>Temp : {forecastItem.main.temp}°C</Text>
                      <Text style={styles.forecastDescription}>{forecastItem.weather[0].description}</Text>
                    </View>
                  )}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#87CEEB', // Bleu ciel pour le fond
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  cityName: {
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentWeatherContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  currentTemp: {
    fontSize: 48,
    color: '#333',
    fontWeight: 'bold',
  },
  currentDescription: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  dayContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFF5EE',
    borderRadius: 10,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastDetail: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F0F8FF',
    borderRadius: 5,
  },
  forecastTime: {
    fontSize: 16,
    color: '#333',
  },
  forecastTemp: {
    fontSize: 16,
    color: '#333',
  },
  forecastDescription: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
});

export default Weather;
