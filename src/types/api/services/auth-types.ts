export type Auth = {
    login: (
        username: string,
        password: string,
    ) => Promise<{ key: string }>;
    logout: () => void;
    registration: (
        username: string,
        email: string,
        password1: string,
        password2: string,
    ) => void;
};
