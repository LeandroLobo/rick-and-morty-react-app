import React, { useEffect, useRef } from 'react';
import { Text, View, Image, Animated } from 'react-native';

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
      default:
        return 'text-gray-500';
    }
  };

  return (
    <View className="m-4 flex-row rounded-lg bg-white p-4">
      <Image source={{ uri: character.image }} className="h-32 w-32 rounded-full" />
      <View className="ml-4">
        <Text className="text-2xl">{character.name}</Text>
        <Text className="text-lg font-light">{character.species}</Text>
        <Text className={`font-bold ${getGenderColors()}`}>{character.gender}</Text>
        <Text className={`font-bold ${getStatusColors()}`}>{character.status}</Text>
      </View>
    </View>
  );
}

interface AnimatedCharacterCardProps {
  character: Character;
  index: number;
}

export function AnimatedCharacterCard({ character, index }: AnimatedCharacterCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: index * 500,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CharacterCard character={character} />
    </Animated.View>
  );
}
