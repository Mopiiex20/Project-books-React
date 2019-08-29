import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { RootState } from "./rootReduser";

import { doLogin } from "./login/loginSaga";
import { onError } from './common/errorSagas'
import { doAdmin } from './admin/adminTableSaga'
import { doBuyBook } from "./addToCart/AddToCartSaga";

import { all } from "redux-saga/effects";

import { loadState, saveState } from './localStorage'


export default function configureStore(

  initialState?: RootState
): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const composeEnhancers = composeWithDevTools({});

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const persistedState = loadState();

  const store = createStore(rootReducer, persistedState, enhancer);
  store.subscribe(() => {
    saveState({
      login: store.getState().login,
      cart: store.getState().cart
    });
  });

  sagaMiddleware.run(function* () {
    yield all([
      doLogin(),
      onError(),
      doAdmin(),
      doBuyBook()
    ]);
  });

  return store;
}
