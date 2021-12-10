export const getAllUser = (user) => {
    return{
        type: 'SETTER_USER',
        payload: user
    }
}
export const insertUser = (user) => {
    return{
        type: 'INSERT_USER',
        payload: user
    }
}