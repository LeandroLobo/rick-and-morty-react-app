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
  firstEpisode?: {
    id: number;
    name: string;
    episode: string;
  };
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

    // Obtener los IDs de los primeros episodios de cada personaje
    const firstEpisodeIds = characters
      .map((char) => char.episodeNumber)
      .filter((id, index, self) => id && self.indexOf(id) === index); // Eliminar duplicados y vacíos

    // Solo si hay IDs válidos, obtener los detalles de los episodios
    if (firstEpisodeIds.length > 0) {
      const episodesUrl = `${episodeUrl}${firstEpisodeIds.join(',')}`;
      try {
        const episodesResponse = await fetch(episodesUrl);
        if (episodesResponse.ok) {
          let episodesData = await episodesResponse.json();

          // Asegurarse de que episodesData sea un array (incluso si solo hay un resultado)
          if (!Array.isArray(episodesData)) {
            episodesData = [episodesData];
          }

          // Crear un mapa para buscar episodios por ID más eficientemente
          const episodesMap = episodesData.reduce(
            (map: { [key: number]: { id: number; name: string; episode: string } }, ep) => {
              map[ep.id] = {
                id: ep.id,
                name: ep.name,
                episode: ep.episode,
              };
              return map;
            },
            {}
          );

          // Agregar la información del primer episodio a cada personaje
          characters.forEach((character) => {
            const epId = parseInt(character.episodeNumber, 10);
            if (episodesMap[epId]) {
              character.firstEpisode = episodesMap[epId];
            }
          });
        }
      } catch (episodeError) {
        console.log('Error obteniendo episodios:', episodeError);
      }
    }

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

    // También obtener el primer episodio para este personaje
    let firstEpisode;
    if (episodeNumber) {
      try {
        const epResponse = await fetch(`${episodeUrl}${episodeNumber}`);
        if (epResponse.ok) {
          const epData = await epResponse.json();
          firstEpisode = {
            id: epData.id,
            name: epData.name,
            episode: epData.episode,
          };
        }
      } catch (epError) {
        console.log('Error obteniendo episodio:', epError);
      }
    }

    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      image: character.image,
      episodeNumber,
      episode: character.episode,
      firstEpisode,
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
