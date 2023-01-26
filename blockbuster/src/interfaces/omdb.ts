export interface OMDBType {
    Search:       Search[];
    totalResults: string;
    Response:     string;
}

export interface Search {
    Title:  string;
    Year:   string;
    imdbID: string;
    Type:   IType;
    Poster: string;
}

// export enum IType {
//     Movie = "movie",
// }

export type IType = 'movie'|'series'|'episode';