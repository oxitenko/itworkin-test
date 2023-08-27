export interface ILocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
    [key: string]: any;
}

export interface ILocationApiResponse {
    results: ILocation[];
}

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string,
        url: string
    }
    location: {
        name: string,
        url: string
    }
    image: string;
    episode: string[];
    url: string;
    created: string;
    [key: string]: any;
}

export interface ICharacterApiResponse {
    results: ICharacter[]
}

export interface ILocationState {
    location: ILocation[];
    error: string;
    isLoading: boolean;
}

export interface ICharacterState {
    character: ICharacter[];
    error: string;
    isLoading: boolean;
}