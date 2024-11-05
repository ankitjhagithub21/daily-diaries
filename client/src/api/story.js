const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stories`

export const addStory = async (story) => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(story)
    })
    const data = await res.json()
    return data;
}

export const editStory = async (story,id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(story)
    })
    const data = await res.json()
    return data;
}



export const deleteStory = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        credentials: "include",
    })
    const data = await res.json()
    return data;
}

export const getAllStories = async () => {
    const res = await fetch(`${baseUrl}`, {
        credentials: "include"
    })
    const data = await res.json()
    return data;
}

export const getStoryDetails = async (id) => {
    const res = await fetch(`${baseUrl}/${id}`, {
        credentials: "include"
    })
    const data = await res.json()
    return data;
}





