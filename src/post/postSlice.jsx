import { configureStore , createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: 
    [{recommended : 0, post_value : '', id: '', date:'',}],
    reducers: {
        addItem(state, action){
            let newpost = {recommended : action.payload.recommended, post_value : action.payload.post_value, id: action.payload.id, date: action.payload.date }
            state.push(newpost) 
        },
        deleteItem(state, action){
            let findedpro = state.indexOf((user)=> user.id == action.payload.id)
            state.splice(action.payload,1)
        }
    }
    
})



export let { plusNum , addItem, deleteItem } = user.actions

export default user