import { Link } from 'expo-router';
import React, { useEffect, useRef, useState, memo } from 'react';
import { Text, View, Image, Pressable, Animated } from 'react-native';

import FavoriteButton from './FavoriteButton';
import { Character } from '../lib/rickAndMortyAPI';

interface CharacterCardProps {
  character: Character;
}

// Usar memo para evitar re-renderizados innecesarios
export const CharacterCard = memo(({ character }: CharacterCardProps) => {
  const getStatusColors = () => {
    switch (character.status) {
      case 'Alive':
        return 'text-green-500';
      case 'Dead':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getGenderColors = () => {
    switch (character.gender) {
      case 'Male':
        return 'text-cyan-500';
      case 'Female':
        return 'text-pink-500';
      case 'Genderless':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <View className="relative">
      <FavoriteButton character={character} />

      <Link
        asChild
        href={{
          pathname: '/character/search/[...characterGoogleSearch]',
          params: { image: character.image, name: character.name },
        }}>
        {/* Eliminado flex-1 para evitar conflictos de layout */}
        <Pressable className="active:opacity-50" onPress={() => {}}>
          {/* Usamos dimensiones más estables */}
          <View className="m-4 rounded-xl bg-orange-200 p-4">
            <View className="flex-row">
              {/* Dimensiones fijas para la imagen */}
              <Image
                source={{ uri: character.image }}
                style={{ height: 112, width: 112, borderRadius: 56 }}
              />
              <View className="ml-4 flex-1">
                {/* Eliminada la anidación innecesaria */}
                <Text numberOfLines={1} className="text-2xl font-bold">
                  {character.name}
                </Text>

                <View className="mt-2 flex-row">
                  <View style={{ width: '50%' }}>
                    <Text className="text-lg font-light">{character.species}</Text>
                    <Text className={`font-bold ${getGenderColors()}`}>{character.gender}</Text>
                    <Text className={`font-bold ${getStatusColors()}`}>{character.status}</Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text className="font-light">Primer aparición</Text>
                    <Text className="font-bold">
                      {character.firstEpisode
                        ? `Episodio №${character.firstEpisode.id}`
                        : `Episodio №${character.episodeNumber}`}
                    </Text>
                    <Text numberOfLines={2} className="text-gray-600">
                      {character.firstEpisode?.name || 'Unknown episode'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
});

interface AnimatedCharacterCardProps {
  character: Character;
  index: number;
}

// También memoizamos el componente animado
export const AnimatedCharacterCard = memo(({ character, index }: AnimatedCharacterCardProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const renderKey = useRef(`char-${character.id}`).current; // Usamos useRef en lugar de useState para evitar re-renders

  useEffect(() => {
    // Limpia animaciones previas
    opacity.setValue(0);

    // Inicia la nueva animación con parámetros optimizados
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay: Math.min(index * 100, 500), // Limitar el retraso máximo a 500ms
      useNativeDriver: true, // Importante para rendimiento
    }).start();

    // No es necesario un return cleanup ya que estamos usando useRef para renderKey
  }, [character.id, index, opacity]); // Incluimos opacity en las dependencias

  return (
    <Animated.View
      style={{ opacity }}
      key={renderKey} // Asegura que React trate cada elemento como único
    >
      <CharacterCard character={character} />
    </Animated.View>
  );
});
