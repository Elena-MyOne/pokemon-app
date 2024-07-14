export interface PokemonsData {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonsDataResults[];
}

export interface PokemonsDataResults {
  name: string;
  url: string;
}

export interface PokemonData {
  abilities: PokemonAbilitiesData[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: PokemonFormsData[];
  game_indices: PokemonGameIndicesData[];
  height: number;
  held_items: PokemonHeldItemsData[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMovesData[];
  name: string;
  order: number;
  past_abilities: [] | never[];
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: PokemonDataSprites;
  stats: PokemonStatsData[];
  types: PokemonTypesData[];
  weight: number;
}

interface PokemonAbilitiesData {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonFormsData {
  name: string;
  url: string;
}

interface PokemonGameIndicesData {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface PokemonHeldItemsData {
  item: {
    name: string;
    url: string;
  };
  version_details: {
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonMovesData {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

interface PokemonDataSprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other: {
    dream_world: {
      front_default: string;
      front_female: null | string;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    'generation-i': {
      'red-blue': {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
      yellow: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
    };
    'generation-ii': {
      crystal: {
        back_default: string | null;
        back_shiny: string | null;
        back_shiny_transparent: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_shiny_transparent: string | null;
        front_transparent: string | null;
      };
      gold: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
      silver: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
    };
    'generation-iii': {
      emerald: {
        front_default: string | null;
        front_shiny: string | null;
      };
      'firered-leafgreen': {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      'ruby-sapphire': {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    'generation-iv': {
      'diamond-pearl': {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      'heartgold-soulsilver': {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      platinum: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    'generation-v': {
      'black-white': {
        animated: {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string | null;
          front_female: null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    'generation-vi': {
      'omegaruby-alphasapphire': {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      'x-y': {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    'generation-vii': {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
      'ultra-sun-ultra-moon': {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    'generation-viii': {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
    };
  };
}

interface PokemonStatsData {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonTypesData {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
