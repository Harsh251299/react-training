export const formatTitleMiddleware = (store) => (next) => (action) => {
    if (action.type === "ADD_TODO") {
        console.log("2:- In the Middleware of ADD_TODO")
        const today = "Added at 2025-08-07"
        action.value = `${today}: ${action.value}`
    }
    if (action.type === "DELETE_TODO") {
        console.log("2:- In the Middleware of DELETE")
    }
    if (action.type === "EDIT_TODO") {
        console.log("2:- In the Middleware of EDIT_TODO")
        const today = "Edited at 2025-08-07"
        action.value = `${today}: ${action.value}`
    }
    if (action.type === "TOGGLE_TODO") {
        console.log("2:- In the Middleware of TOGGLE_TODO")
    }
    return next(action)
};