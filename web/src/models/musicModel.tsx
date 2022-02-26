export type MusicModel = {
    id: number | null;
    photo: string;
    name: string;
    album: string;
    genreId: number;
    authorId: number,
    description: string;
    link: string;
    like: boolean | null;
}