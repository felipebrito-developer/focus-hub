import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider, Text } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Provider as JotaiProvider } from 'jotai';

import { initDb } from '../db';

// Minimalist Theme Override
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    secondary: '#333333',
    background: '#FFFFFF',
    surface: '#F5F5F5',
  },
};

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Focus Hub</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Minimalist Mobile Architecture</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize local database on app start
    initDb();
  }, []);

  return (
    <JotaiProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </JotaiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.primary,
  },
  subtitle: {
    color: theme.colors.secondary,
  },
});
