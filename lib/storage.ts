/**
 * Universal storage wrapper
 * Web → localStorage
 * iOS/Android → AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const storage = {
  /**
   * Get item from storage
   */
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`[Storage] Failed to get item "${key}":`, error);
      return null;
    }
  },

  /**
   * Set item to storage
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`[Storage] Failed to set item "${key}":`, error);
    }
  },

  /**
   * Remove item from storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        return;
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[Storage] Failed to remove item "${key}":`, error);
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.clear();
        return;
      }
      await AsyncStorage.clear();
    } catch (error) {
      console.error('[Storage] Failed to clear storage:', error);
    }
  },
};
