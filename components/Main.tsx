import { useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList, TextInput, Button, Text } from 'react-native';

import { AnimatedCharacterCard } from './CharacterCard';
import { Character, getCharacters } from '../lib/rickAndMortyAPI';

export function Main() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 🔹 Debouncer: Actualiza `debouncedSearch` solo después de 500ms sin cambios
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const { characters, totalPages, count } = await getCharacters(debouncedSearch, page);
      setCharacters(characters);
      setTotalPages(totalPages);
      setCount(count);
      setLoading(false);
    };

    fetchCharacters();
  }, [debouncedSearch, page]);

  return (
    <View>
      <TextInput
        placeholder="Search character"
        className="ml-4 mr-4 mt-4 rounded-lg border-2 pl-2"
        value={search}
        onChangeText={setSearch}
      />

      {loading && <ActivityIndicator size="large" color="orange" />}

      {!loading && (
        <>
          <View className="mx-4 mt-3 rounded-lg bg-orange-100 p-2">
            <Text className="text-center text-orange-800">
              {count === 0
                ? 'No se encontraron personajes'
                : count === 1
                  ? 'Se encontró 1 personaje'
                  : `Se encontraron ${count} personajes`}
            </Text>
          </View>
          <View className="m-4 flex-row items-center justify-around">
            <Button
              title="Anterior"
              color={page === 1 ? 'gray' : '#f97316'}
              onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            />
            <Text>
              Página {totalPages === 0 ? 0 : page} de {totalPages}
            </Text>
            <Button
              title="Siguiente"
              color={page === totalPages ? 'gray' : '#f97316'}
              onPress={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={page >= totalPages}
            />
          </View>
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <AnimatedCharacterCard character={item} index={index} />
            )}
          />
        </>
      )}
    </View>
  );
}
