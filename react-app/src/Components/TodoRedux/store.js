import { timingEnhancer } from "./enhancer";
import { formatTitleMiddleware } from "./middleware";
import { compose, applyMiddleware, createStore } from 'redux';
import { todoReducer } from "./reducer";

const appliedMiddleware = applyMiddleware(formatTitleMiddleware)
const composedEnhancer = compose(timingEnhancer, appliedMiddleware)

const store = createStore(todoReducer, composedEnhancer);

export default store;