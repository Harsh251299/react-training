export const timingEnhancer = (createStore) => (
    reducer,
    initialState,
    enhancer
) => {
    const monitoredReducer = (state, action) => {
        console.log("3:- Inside the Enhancer");
        console.log("4:- Reducer timing starts");
        const start = performance.now();
        const newState = reducer(state, action);
        const end = performance.now();
        console.log("6:- Reducer timing ends");
        console.log(`7:- Reducer: ${action.type} took ${(end - start).toFixed(2)} ms`);
        return newState;
    };

    return createStore(monitoredReducer, initialState, enhancer);
};