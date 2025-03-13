import { FontAwesome } from '@expo/vector-icons';
import FavoriteButton from 'components/FavoriteButton';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

import { Character, getCharacter } from '../../lib/rickAndMortyAPI';

export default function CharacterDetail() {
  const { characterId } = useLocalSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await getCharacter(String(characterId));
        setCharacter(response);
        setError(false);
      } catch (err) {
        console.error('Error fetching character:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      fetchCharacter();
    }
  }, [characterId]);

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  // Mostrar mensaje de error si no se encuentra el personaje
  if (error || !character) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl">Personaje no encontrado</Text>
      </View>
    );
  }

  // Mostrar los detalles del personaje
  return (
    <View className="flex-1 bg-orange-50 p-4">
      <Stack.Screen
        options={{
          headerTitle: character.name,
          headerStyle: {
            backgroundColor: '#f97316',
          },
          headerBackTitle: 'Volver',
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerShadowVisible: true,
          headerTitleStyle: {
            fontSize: 22,
          },
          headerLeft: () => (
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => router.navigate('/')} // O router.back()
              className="ml-4 flex-row items-center">
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="my-4 items-center">
        <Image source={{ uri: character.image }} className="h-64 w-64 rounded-lg" />
      </View>
      <View className="relative rounded-lg bg-orange-200 p-4">
        <FavoriteButton character={character} size={30} />
        <Text className="mb-2 text-xl font-bold">Información</Text>
        <Text className="text-lg">
          Status: <Text className="font-bold">{character.status}</Text>
        </Text>
        <Text className="text-lg">
          Especie: <Text className="font-bold">{character.species}</Text>
        </Text>
        <Text className="text-lg">
          Género: <Text className="font-bold">{character.gender}</Text>
        </Text>
        <Text className="text-lg">
          Origen: <Text className="font-bold">{character.origin?.name}</Text>
        </Text>
        <Text className="text-lg">
          Ubicación: <Text className="font-bold">{character.location?.name}</Text>
        </Text>
        <Text className="mt-2 text-xl font-bold">Primer aparición</Text>
        <Text className="text-lg font-bold">
          {character.firstEpisode
            ? `- Episodio №${character.firstEpisode.id}`
            : `- Episodio №${character.episodeNumber}`}
        </Text>
        <Text className="text-xl text-orange-800">
          - {character.firstEpisode?.name || 'Unknown episode'}
        </Text>
      </View>
    </View>
  );
}
