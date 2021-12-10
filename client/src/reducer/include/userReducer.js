const initialState = [];
export default function UserReducer (state = initialState, action){
    switch (action.type){
        case 'SETTER_USER':
            return [action.payload];
        case 'INSERT_USER':
            return state.concat(action.payload);
        default: 
            return state;
    }
}