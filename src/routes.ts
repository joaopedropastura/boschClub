//rotas que não precisam de autenticaçao

export const publicRoutes = [
    "/feed",
    "/menu",
    "/api/user",
    "/api/party-places",
    "/auth/new-verification",
    "api/auth/callback"
    
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",

]


export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/settings"