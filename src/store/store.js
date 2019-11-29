/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as reducers from '../reducers';

export default function configureStore(kc) {
  let enchancer = {};

  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLogger({ collapsed: true });
    const composeEnhancers = composeWithDevTools({});
    enchancer = composeEnhancers(
      applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
  } else {
    enchancer = compose(applyMiddleware(thunkMiddleware));
  }

  const initialState = {
    UserReducer: {
      kc: kc
    }
  };

  const combinedReducer = combineReducers({
    ...reducers
  });

  let store = createStore(combinedReducer, initialState, enchancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
