import { useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';

import { AnimatedCharacterCard } from './CharacterCard';
import { Character, getCharacters } from '../lib/rickAndMortyAPI';

export function Main() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  return (
    <View>
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
