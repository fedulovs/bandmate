'use client';
import { AppStore, store } from './store';
import { makeStore } from './store';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

interface Props {
    readonly children: ReactNode;
}

persistStore(store);

export const ReduxProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};
