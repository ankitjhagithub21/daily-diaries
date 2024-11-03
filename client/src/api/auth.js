const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const register = async (userData) => {
    const res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData)
    })
    const data = await res.json()
    return data;
}


export const login = async (userData) => {
    const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(userData)
    })
    const data = await res.json()
    return data;
}

export const getAuthUser = async () => {
    const res = await fetch(`${baseUrl}/me`, {
        credentials: "include"
    })
    const data = await res.json()
    return data;
}





