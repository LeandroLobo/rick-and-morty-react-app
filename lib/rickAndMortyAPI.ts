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
}

export async function getCharacters(id?: number): Promise<Character[]> {
  const response = await fetch(characters + (id ? `/${id}` : ''));
  const data = await response.json();
  return data.results.map((character: any): Character => {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      image: character.image,
    };
  });
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
