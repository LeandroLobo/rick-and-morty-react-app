const characterUrl = 'https://rickandmortyapi.com/api/character/';
const locationUrl = 'https://rickandmortyapi.com/api/location/';
const episodeUrl = 'https://rickandmortyapi.com/api/episode/';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  episode: string[]; // Array de URLs
  episodeNumber: string;
  origin: any;
  location: any;
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
        location: character.location,
        origin: character.origin,
      };
    });

    return { characters, totalPages: data.info.pages, count: data.info.count };
  } catch (error) {
    console.log('error: ', error);
    return { characters: [], totalPages: 0, count: 0 };
  }
}
export async function getCharacter(id: string): Promise<Character> {
  const url = `${characterUrl}${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener el personaje');

    const data = await response.json();
    const character = data;

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
      location: character.location,
      origin: character.origin,
    };
  } catch (error) {
    console.log('error: ', error);
    return {} as Character;
  }
}

export async function getLocations(name: string | null = null): Promise<any[]> {
  const response = await fetch(locationUrl + (name ? `?name=${name}` : ''));
  const data = await response.json();
  return data.results;
}

export async function getEpisodes(url: string | null = null): Promise<any[]> {
  const response = await fetch(url ? url : episodeUrl);
  const data = await response.json();
  return data.results;
}
