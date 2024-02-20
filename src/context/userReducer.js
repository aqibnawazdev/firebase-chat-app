export const userReducer = (state, action) => {
    if (action.type === "SELECT_USER") {
        return action.payload;
    } else {
        return new Error("Un-known Action")
    }
};