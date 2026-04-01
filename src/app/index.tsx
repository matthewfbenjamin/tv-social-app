import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import Parse from '../lib/parse';
import { useAuthStore } from '../store/authStore';

// import '@/global.css';

const CREDS_KEY = 'userCredentials';


export default function Index() {
  useEffect(() => {
    bootstrap();
  }, []);

  async function getItem(key: string) {
    try {
      if (Platform.OS === 'web') {
        const asyncStoredItem = await AsyncStorage.getItem(key);
        return asyncStoredItem
      } else { // mobile
        const secureStorestoredItem = await SecureStore.getItemAsync(key);
        return secureStorestoredItem 
      }
    } catch (error) {
      console.error("Error saving data:", error); 
    }
  }

  async function bootstrap() {
    const current = await Parse.User.currentAsync();

    // No session at all — go straight to login
    if (!current) {
      router.replace('/auth/register');
      return;
    }

    // Session exists — check whether biometrics are enrolled
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    const storedCreds = await getItem(CREDS_KEY);

    if (enrolled && storedCreds) {
      // Biometrics available — prompt before granting access
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock TV Social',
        fallbackLabel: 'Use password',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        // Re-authenticate with Parse to refresh the session token
        const { email, password } = JSON.parse(storedCreds);
        try {
          const user = await Parse.User.logIn(email, password);
          useAuthStore.getState().setUser(user);
          router.replace('/tabs/home');
        } catch {
          // Credentials stale (e.g. password changed elsewhere) — force login
          await SecureStore.deleteItemAsync(CREDS_KEY);
          router.replace('/auth/login');
        }
      } else {
        // Biometric dismissed or failed — fall back to password login
        router.replace('/auth/login');
      }
    } else {
      // No biometrics enrolled — use the existing Parse session directly
      useAuthStore.getState().setUser(current);
      router.replace('/tabs/home');
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});