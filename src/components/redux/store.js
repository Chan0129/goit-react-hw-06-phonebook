import { configureStore } from '@redux/toolkit';
import { filterReducer } from './slices/filter';
import { contactNumber } from './slices/contacts';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedContacts = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    contacts: persistedContacts,
  },
  middleware(getDefaultMiddleware) {
    return getDefaulftMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
