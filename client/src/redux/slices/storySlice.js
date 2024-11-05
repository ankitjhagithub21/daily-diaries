import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stories: [],
    loading: true,
}

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {

        setStories: (state, action) => {
            state.stories = action.payload
        },
        addNewStory:(state,action)=>{
            state.stories.push(action.payload)
        },
        removeStory:(state,action)=>{
            state.stories = state.stories.filter((story)=>story._id !== action.payload)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})


export const { setStories,setLoading,addNewStory,removeStory } = storySlice.actions

export default storySlice.reducer