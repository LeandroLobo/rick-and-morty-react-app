// lib/FavoritesContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from 'lib/services/RickAndMortyAPI';
import React, { useState, useEffect, useContext, createContext } from 'react';

interface FavoritesContextType {
  favorites: Character[];
  addFavorite: (character: Character) => Promise<void>;
  removeFavorite: (characterId: number) => Promise<void>;
  isFavorite: (characterId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  // Guardar favoritos cuando cambien
  const saveFavorites = async (newFavorites: Character[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = async (character: Character) => {
    const newFavorites = [...favorites, character];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (characterId: number) => {
    const newFavorites = favorites.filter((char) => char.id !== characterId);
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (characterId: number) => {
    return favorites.some((char) => char.id === characterId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
