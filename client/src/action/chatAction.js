export const getAllMessage = (mess) => {
    return{
        type: 'SETTER_MESSAGE',
        payload: mess
    }
}