import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../user/types';

const initialState: User = {
    id: '',
    name: '',
    tags: [],
    email: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<User>) => {
            (state.id = action.payload.id),
                (state.name = action.payload.name),
                (state.tags = action.payload.tags),
                (state.email = action.payload.email);
        },
    },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
