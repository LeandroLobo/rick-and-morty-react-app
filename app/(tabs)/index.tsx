import { AnimatedCharacterCard } from 'components/CharacterCard';
import { Character, getCharacters } from 'lib/rickAndMortyAPI';
import { useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList, TextInput, Text, TouchableOpacity } from 'react-native';

export default function Index() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setCharacters([]); // Limpia los personajes anteriores antes de cargar nuevos
      try {
        const { characters, totalPages, count } = await getCharacters(debouncedSearch, page);
        setCharacters(characters || []); // Asegúrate de que nunca sea null o undefined
        setTotalPages(totalPages || 1);
        setCount(count || 0);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setCharacters([]);
        setTotalPages(0);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [debouncedSearch, page]);

  return (
    <View className="flex-1 bg-orange-50">
      <TextInput
        placeholder="Buscar Personaje"
        className="mx-4 mt-3 rounded-lg border-2 pl-2 text-lg"
        value={search}
        onChangeText={setSearch}
      />

      {loading && <ActivityIndicator size="large" color="orange" />}

      {!loading && (
        <>
          <View className="mx-4 mt-3 rounded-lg bg-orange-200 p-2">
            <Text className="text-center text-orange-800">
              {count === 0
                ? 'No se encontraron personajes'
                : count === 1
                  ? 'Se encontró 1 personaje'
                  : `Se encontraron ${count} personajes`}
            </Text>
          </View>
          <View className="mt-3 flex-row items-center justify-around">
            <TouchableOpacity
              onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`rounded-lg px-5 py-2 ${page === 1 ? 'bg-gray-400' : 'bg-orange-500 active:bg-orange-600'}`}
              activeOpacity={0.7}>
              <Text className="font-semibold text-white">Anterior</Text>
            </TouchableOpacity>

            <Text className="text-center">
              Página {totalPages === 0 ? 0 : page} de {totalPages}
            </Text>

            <TouchableOpacity
              onPress={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={page >= totalPages}
              className={`rounded-lg px-5 py-2 ${page >= totalPages ? 'bg-gray-400' : 'bg-orange-500 active:bg-orange-600'}`}
              activeOpacity={0.7}>
              <Text className="font-semibold text-white">Siguiente</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={characters}
            keyExtractor={(item) => `character-${item.id}`} // Clave más explícita
            renderItem={({ item, index }) => (
              <AnimatedCharacterCard character={item} index={index} />
            )}
            // initialNumToRender={4} // Reduce el número inicial de elementos renderizados
            // maxToRenderPerBatch={4} // Limita cuántos elementos se renderizan en cada lote
            // windowSize={4} // Reduce el tamaño de la ventana para mejorar rendimiento
            // removeClippedSubviews // Mejora rendimiento al quitar componentes fuera de pantalla
            // contentContainerStyle={{ paddingBottom: 50 }} // Espacio extra al final
          />
        </>
      )}
    </View>
  );
}
