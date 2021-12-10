const initialState = [];
export default function ChatReducer (state = initialState, action){
    switch (action.type){
        case 'SETTER_MESSAGE':
            return [...state, action.payload];
        default: 
            return state;
    }
}