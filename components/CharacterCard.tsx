import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, Pressable, Animated } from 'react-native';

import FavoriteButton from './FavoriteButton';
import { Character } from '../lib/rickAndMortyAPI';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
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
        <Pressable className="flex-1 active:opacity-50" onPress={() => {}}>
          <View className="m-4 max-w-full flex-row rounded-xl bg-orange-200 p-4">
            <Image source={{ uri: character.image }} className="h-28 w-28 rounded-full" />
            <View className="ml-4 flex-1 flex-col">
              <View className="w-full">
                <Text className="overflow-hidden whitespace-normal break-words text-2xl">
                  {character.name}
                </Text>
              </View>
              <View className="flex-1 flex-row">
                <View className="w-1/2">
                  <Text className="overflow-hidden whitespace-normal break-words text-lg font-light">
                    {character.species}
                  </Text>
                  <Text
                    className={`overflow-hidden whitespace-normal break-words font-bold ${getGenderColors()}`}>
                    {character.gender}
                  </Text>
                  <Text
                    className={`overflow-hidden whitespace-normal break-words font-bold ${getStatusColors()}`}>
                    {character.status}
                  </Text>
                </View>
                <View className="flex w-1/2 justify-center">
                  <Text className="font-light">Primer aparición</Text>
                  <Text className="font-bold">
                    {character.firstEpisode
                      ? `Episodio №${character.firstEpisode.id}`
                      : `Episodio №${character.episodeNumber}`}
                  </Text>
                  <Text numberOfLines={3} className="text-gray-600">
                    {character.firstEpisode?.name || 'Unknown episode'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

interface AnimatedCharacterCardProps {
  character: Character;
  index: number;
}

// components/CharacterCard.tsx
export function AnimatedCharacterCard({ character, index }: AnimatedCharacterCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const [renderKey] = useState(`char-${character.id}`); // Clave estable para re-renderizados

  useEffect(() => {
    // Limpia animaciones previas
    opacity.setValue(0);

    // Inicia la nueva animación
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay: index * 200, // Limita el delay máximo a 1 segundo
      useNativeDriver: true, // Importante para rendimiento
    }).start();

    return () => {
      // Limpieza al desmontar
      opacity.setValue(0);
    };
  }, [character.id, index]); // Dependencia en character.id para reiniciar la animación cuando cambia

  return (
    <Animated.View
      style={{ opacity }}
      key={renderKey} // Asegura que React trate cada elemento como único
    >
      <CharacterCard character={character} />
    </Animated.View>
  );
}
