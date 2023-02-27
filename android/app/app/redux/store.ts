import { createStore, applyMiddleware, AnyAction, Store } from 'redux';
import thunk from 'redux-thunk';
import { Persistor, persistStore } from 'redux-persist';
import { rootReducer } from './reducer';

export let store: Store<any, AnyAction>;
export let persistor: Persistor;

export default () => {
    store = createStore(rootReducer, applyMiddleware(thunk));
    persistor = persistStore(store);
    return { store, persistor };
};
