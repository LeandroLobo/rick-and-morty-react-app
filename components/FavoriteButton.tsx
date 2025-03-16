import { FontAwesome } from '@expo/vector-icons';
import { useFavorites } from 'lib/context/FavoritesContext';
import { Character } from 'lib/services/RickAndMortyAPI';
import { TouchableOpacity } from 'react-native';

export default function FavoriteButton({
  character,
  size = 24,
}: {
  character: Character;
  size?: number;
}) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoritePress = async () => {
    if (isFavorite(character.id)) {
      await removeFavorite(character.id);
    } else {
      await addFavorite(character);
    }
  };

  return (
    <TouchableOpacity
      className="absolute right-6 top-6 z-10"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={handleFavoritePress}>
      <FontAwesome
        name={isFavorite(character.id) ? 'heart' : 'heart-o'}
        size={size}
        color={isFavorite(character.id) ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
}
