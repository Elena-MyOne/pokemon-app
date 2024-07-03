export interface PokemonsData {
  count: number,
  next: string | null,
  previous: string | null,
  results: PokemonsDataResults[]
}

export interface PokemonsDataResults {
  name: string,
  url: string
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
  past_abilities: [];
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
  }
  is_hidden: boolean;
  slot: number
}

interface PokemonFormsData {
  name: string;
  url: string
}

interface PokemonGameIndicesData {
  game_index: number;
  version: {
    name: string;
    url: string;
  }
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
      url: string
    }
  }[]
}

interface PokemonMovesData {
  move: {
    name: string;
    url: string;
  },
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    },
    version_group: {
      name: string;
      url: string;
    }
  }[]
}

interface PokemonDataSprites {
  back_default: string,
  back_female: null,
  back_shiny: string,
  back_shiny_female: null,
  front_default: string,
  front_female: null,
  front_shiny: string,
  front_shiny_female: null,
}

interface PokemonStatsData {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

interface PokemonTypesData {
  slot: number;
  type: {
    name: string;
    url: string
  }
}