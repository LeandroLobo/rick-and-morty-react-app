import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedCharacterCard } from './CharacterCard';
import { Character, getCharacters } from '../lib/rickAndMortyAPI';
import { AntDesign } from '@expo/vector-icons';

export function Main() {
  const insets = useSafeAreaInsets();

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Link asChild href="/about">
        <Pressable className="mb-2 flex-row items-center justify-center">
          <AntDesign name="idcard" size={24} color="black" />
          <Text className="ml-4 text-2xl">Ir al About</Text>
        </Pressable>
      </Link>
      {characters.length === 0 ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <AnimatedCharacterCard character={item} index={index} />}
        />
      )}
    </View>
  );
}
