export type UserModel = {
    id?: number | null;
    password?: string;
    uid?: string;
    name: string;
    email: string | null;
    admin?: boolean;
    created?: string;
    updated?: string;
    avatar?: string ;
    login?: string;
}