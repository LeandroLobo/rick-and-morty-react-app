import { useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedCharacterCard } from './CharacterCard';
import { TopHeader } from './TopHeader';
import { Character, getCharacters } from '../lib/rickAndMortyAPI';

export function Main() {
  const insets = useSafeAreaInsets();

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <TopHeader />
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
