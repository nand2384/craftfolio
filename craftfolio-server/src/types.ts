export type IdGeneratorData = {
    id: number;
    table: string;
    column: string;
};

export type RegisterUserData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export type LoginUserData = {
    email: string;
    password: string;
};

export type JwtPayload = {
    user_id: number | null;
    email: string | null;
    role_id: Role | number | null;
}

export enum Role {
    ADMIN = 0,
    USER = 1,
}