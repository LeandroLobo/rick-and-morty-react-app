import { Link } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, Animated, Pressable } from 'react-native';

import { Character, Episode } from '../lib/rickAndMortyAPI';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [episode, setEpisode] = useState<Episode | null>(null);

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

  const getEpisode = async (episodeUrl: string) => {
    const response = await fetch(episodeUrl);
    const data: Episode = await response.json();
    return data;
  };

  useEffect(() => {
    if (character.episode && character.episode.length > 0) {
      getEpisode(character.episode[0]).then((data) => setEpisode(data));
    }
  }, [character.episode]);

  return (
    <Link
      asChild
      href={{
        pathname: '/character/[...character]',
        params: { id: character.id, name: character.name },
      }}>
      <Pressable className="active:opacity-50" onPress={() => {}}>
        <View className="m-4 max-w-full flex-row rounded-xl bg-white p-4">
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
                <Text className="font-light">First appearance</Text>
                <Text className="font-bold">Episode №{character.episodeNumber}</Text>
                <Text className="text-gray-600">{episode?.name}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
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
