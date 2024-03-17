import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from './authSlice';
import { userReducer } from './userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['authState'],
};

const userPersistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['userState'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({ serializableCheck: false });
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
