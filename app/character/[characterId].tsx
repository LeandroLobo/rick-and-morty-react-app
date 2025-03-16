import { FontAwesome } from '@expo/vector-icons';
import FavoriteButton from 'components/FavoriteButton';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useTheme } from 'lib/context/ThemeContext';
import { Character, getCharacter } from 'lib/services/RickAndMortyAPI';
import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function CharacterDetail() {
  const { characterId } = useLocalSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { theme } = useTheme();

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
      <View className="bg-rick-50 dark:bg-dark-background flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={theme === 'dark' ? '#818cf8' : '#f97316'} />
      </View>
    );
  }

  // Mostrar mensaje de error si no se encuentra el personaje
  if (error || !character) {
    return (
      <View className="bg-rick-50 dark:bg-dark-background flex-1 items-center justify-center p-4">
        <Text className="dark:text-dark-text text-xl text-black">Personaje no encontrado</Text>
      </View>
    );
  }

  const getStatusColor = () => {
    switch (character.status) {
      case 'Alive':
        return 'text-status-alive dark:text-status-alive';
      case 'Dead':
        return 'text-status-dead dark:text-status-dead';
      default:
        return 'text-status-unknown dark:text-status-unknown';
    }
  };

  const getGenderColor = () => {
    switch (character.gender) {
      case 'Male':
        return 'text-gender-male dark:text-gender-male';
      case 'Female':
        return 'text-gender-female dark:text-gender-female';
      case 'Genderless':
        return 'text-gender-genderless dark:text-gender-genderless';
      default:
        return 'text-gender-unknown dark:text-gender-unknown';
    }
  };

  // Mostrar los detalles del personaje
  return (
    <View className="bg-rick-50 dark:bg-dark-background flex-1 p-4">
      <Stack.Screen
        options={{
          headerTitle: character.name,
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#374151' : '#f97316', // dark-card : rick
          },
          headerBackTitle: 'Volver',
          headerTintColor: theme === 'dark' ? '#f9fafb' : 'black', // dark-text : black
          headerTitleAlign: 'center',
          headerShadowVisible: true,
          headerTitleStyle: {
            fontSize: 22,
            color: theme === 'dark' ? '#f9fafb' : 'black', // dark-text : black
          },
          headerLeft: () => (
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => router.navigate('/')} // O router.back()
              className="ml-4 flex-row items-center">
              <FontAwesome
                name="arrow-left"
                size={20}
                color={theme === 'dark' ? '#f9fafb' : 'black'}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="my-4 items-center">
        <Image
          source={{ uri: character.image }}
          className="h-64 w-64 rounded-lg shadow-md"
          resizeMode="cover"
        />
      </View>
      <View className="bg-rick-200 dark:bg-dark-card relative rounded-lg p-4 shadow-md">
        <FavoriteButton character={character} size={30} />

        <Text className="dark:text-dark-text mb-2 text-xl font-bold text-black">Información</Text>

        <Text className="dark:text-dark-text text-lg text-black">
          Status: <Text className={`font-bold ${getStatusColor()}`}>{character.status}</Text>
        </Text>
        <Text className="dark:text-dark-text text-lg text-black">
          Género: <Text className={`font-bold ${getGenderColor()}`}>{character.gender}</Text>
        </Text>
        <Text className="dark:text-dark-text text-lg text-black">
          Especie:{' '}
          <Text className="dark:text-dark-text font-bold text-black">{character.species}</Text>
        </Text>

        <Text className="dark:text-dark-text text-lg text-black">
          Origen:{' '}
          <Text className="dark:text-dark-text font-bold text-black">{character.origin?.name}</Text>
        </Text>

        <Text className="dark:text-dark-text text-lg text-black">
          Ubicación:{' '}
          <Text className="dark:text-dark-text font-bold text-black">
            {character.location?.name}
          </Text>
        </Text>

        <Text className="dark:text-dark-text mt-2 text-xl font-bold text-black">
          Primer aparición
        </Text>

        <Text className="dark:text-dark-text text-lg font-bold text-black">
          {character.firstEpisode
            ? `- Episodio №${character.firstEpisode.id}`
            : `- Episodio №${character.episodeNumber}`}
        </Text>

        <Text className="text-rick-800 dark:text-rick-400 text-xl">
          - {character.firstEpisode?.name || 'Unknown episode'}
        </Text>
      </View>
    </View>
  );
}
