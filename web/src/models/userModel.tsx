export type UserModel = {
    id?: number | null;
    name: string;
    email: string;
    password: string;
    admin: boolean;
}