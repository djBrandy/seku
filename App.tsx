import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Home, FlaskConical, BookOpen, BarChart2, Settings } from 'lucide-react-native';

// Placeholder screens
import HomeScreen from './src/screens/HomeScreen';
import LabScreen from './src/screens/LabScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10 },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home color={color} size={size} />;
          if (route.name === 'Lab') return <FlaskConical color={color} size={size} />;
          if (route.name === 'Resources') return <BookOpen color={color} size={size} />;
          if (route.name === 'Progress') return <BarChart2 color={color} size={size} />;
          if (route.name === 'Settings') return <Settings color={color} size={size} />;
          return null;
        },
        tabBarActiveTintColor: '#3182ce',
        tabBarInactiveTintColor: '#718096',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lab" component={LabScreen} />
      <Tab.Screen name="Resources" component={ResourcesScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockOrientation();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
