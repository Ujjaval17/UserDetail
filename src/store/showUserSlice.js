import { createSlice } from "@reduxjs/toolkit";

const initialShowState = {showUser:false, userDetails: {}}
const showUserSlice = createSlice({
    name : 'showUser',
    initialState : initialShowState,
    reducers : {
        getDetails(state,action){
           
            const newUser = action.payload;
            console.log(newUser, state);
            state.userDetails = {
                //...state.userDetails,
                todoID : newUser.todoID,
                title : newUser.title,
                userID : newUser.userID,
                //userName : newUser.name,
                //email : newUser.email
            }
        },
        showUserData(state){
            state.showUser = true;
        }
    }
});

export const showUserActons = showUserSlice.actions;
export default showUserSlice.reducer;