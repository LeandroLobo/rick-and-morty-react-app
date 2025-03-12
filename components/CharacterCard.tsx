import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, TouchableOpacity } from 'react-native';

import { useFavorites } from '../lib/favoritesContext';
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

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoritePress = async () => {
    if (isFavorite(character.id)) {
      await removeFavorite(character.id);
    } else {
      await addFavorite(character);
    }
  };

  return (
    <View className="relative">
      <TouchableOpacity
        className="absolute right-6 top-6 z-10"
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        onPress={handleFavoritePress}>
        <FontAwesome
          name={isFavorite(character.id) ? 'heart' : 'heart-o'}
          size={24}
          color={isFavorite(character.id) ? 'red' : 'black'}
        />
      </TouchableOpacity>

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
                  <Text className="font-light">First appearance</Text>
                  <Text className="font-bold">Episode №{character.episodeNumber}</Text>
                  <Text className="text-gray-600">{episode?.name}</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
