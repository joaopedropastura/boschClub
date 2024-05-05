//rotas que não precisam de autenticaçao

export const publicRoutes = [
    "/feed",
    "/menu",
    "/api/user",
    "/api/party-places",
    
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]


export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/settings"