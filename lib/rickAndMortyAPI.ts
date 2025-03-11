const characters = 'https://rickandmortyapi.com/api/character';
const locations = 'https://rickandmortyapi.com/api/location';
const episodes = 'https://rickandmortyapi.com/api/episode';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  episode: string[]; // Array de URLs
  episodeNumber: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // Array de URLs
  url: string;
  created: string;
}

export async function getCharacters(
  name?: string,
  page: number = 1
): Promise<{ characters: Character[]; totalPages: number; count: number }> {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}${name ? `&name=${encodeURIComponent(name)}` : ''}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener los personajes');

    const data = await response.json();

    // Convertimos los datos a nuestro formato `Character`
    const characters: Character[] = data.results.map((character: any): Character => {
      const episodeNumber = character.episode[0]?.split('/').pop() || '';

      return {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        image: character.image,
        episodeNumber,
        episode: character.episode,
      };
    });

    return { characters, totalPages: data.info.pages, count: data.info.count };
  } catch (error) {
    console.log('XXXXXXXXXXX:', error);
    return { characters: [], totalPages: 0, count: 0 };
  }
}

export async function getLocations(name: string | null = null): Promise<any[]> {
  const response = await fetch(locations + (name ? `?name=${name}` : ''));
  const data = await response.json();
  return data.results;
}

export async function getEpisodes(url: string | null = null): Promise<any[]> {
  const response = await fetch(url ? url : episodes);
  const data = await response.json();
  return data.results;
}
