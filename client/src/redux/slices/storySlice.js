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
        updateStory: (state, action) => {
            console.log(action.payload)
            state.stories = state.stories.map((story) =>
                story._id === action.payload.id
                    ? action.payload.story
                    : story
            );
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})


export const { setStories,setLoading,addNewStory,removeStory,updateStory } = storySlice.actions

export default storySlice.reducer