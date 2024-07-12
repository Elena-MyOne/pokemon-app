import { http, HttpResponse } from 'msw';
import { mockPokemonList } from './mockPokemonList';
import { mockPokemon } from './mockPokemon';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/:id', ({ params }) => {
    const { id } = params;
    if (id === '2000') {
      return HttpResponse.error();
    }

    if (id === '132') {
      return HttpResponse.json(mockPokemon, { status: 200 });
    }

    return HttpResponse.json(mockPokemon, { status: 200 });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('limit');

    if (query === '1000') {
      return HttpResponse.error();
    }

    if (query === '2') {
      return HttpResponse.json(mockPokemonList, { status: 200 });
    }

    return HttpResponse.json(mockPokemonList, { status: 200 });
  }),
];
