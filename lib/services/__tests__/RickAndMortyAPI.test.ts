import { getCharacters } from '../RickAndMortyAPI';

describe('getCharacters', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('parses and returns characters correctly', async () => {
    const charactersResponse = {
      info: { pages: 1, count: 1 },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          image: 'rick.png',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          origin: { name: 'Earth' },
          location: { name: 'Earth' },
        },
      ],
    };

    const episodeResponse = {
      id: 1,
      name: 'Pilot',
      episode: 'S01E01',
    };

    const fetchMock = jest
      .spyOn(global as any, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => charactersResponse,
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => episodeResponse,
      } as any);

    const result = await getCharacters();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.totalPages).toBe(1);
    expect(result.count).toBe(1);
    expect(result.characters[0]).toEqual({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'rick.png',
      episodeNumber: '1',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      firstEpisode: { id: 1, name: 'Pilot', episode: 'S01E01' },
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
    });
  });
});
