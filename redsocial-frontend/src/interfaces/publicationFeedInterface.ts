// Generated by https://quicktype.io

export interface IPublicationFeed {
    status?:            string;
    message?:           string;
    page:              number;
    totalPublications: number;
    pages:             number;
    following:         string[];
    publications:      Publication[];
}

export interface Publication {
    _id:        string;
    text:       string;
    created_at: string;
    user:       User;
    __v:        number;
    file?:      string;
}

export interface User {
    _id:       string;
    name:      string;
    surname:   string;
    nick:      string;
    image:     string;
    create_at: string;
}