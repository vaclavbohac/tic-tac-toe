const initialState = {
    board: [0,0,0,
            0,0,0,
            0,0,0],
    activePlayer: 1,
    winner: undefined,
    typeWin: undefined
}

const boardSize = 3;

const getPositionByCoordinates = (x, y, boardSize) => x + (y*boardSize)

const ticTacToeApp = (state = initialState, action) => {
    switch (action.type) {
        case 'PUT_BUTTON':
            return state.board[action.position] != 0 ?
                state :
                {
                    ...state,
                    board: state.board.map((v, i) =>
                        i == action.position ? state.activePlayer : v
                    )
                }
        case 'CHECK_GAME_STATE':
            //check col
            for(let i = 0; i < boardSize; i++){
                if(state.board[getPositionByCoordinates(action.position%boardSize, i, boardSize)] != state.activePlayer)
                    break
                if(i == boardSize-1){
                    return {
                        ...state,
                        winner: state.activePlayer,
                        typeWin: 'column'
                    }
                }
            }

            //check row
            for(let i = 0; i < boardSize; i++){
                if(state.board[getPositionByCoordinates(i, Math.floor(action.position/boardSize), boardSize)] != state.activePlayer)
                    break
                if(i == boardSize-1){
                    return {
                        ...state,
                        winner: state.activePlayer,
                        typeWin: 'row'
                    }
                }
            }

            //check diag
            if(Math.floor(action.position/boardSize) == action.position%boardSize){
                //we're on a diagonal
                for(let i = 0; i < boardSize; i++){
                    if(state.board[getPositionByCoordinates(i, i, boardSize)] != state.activePlayer)
                        break
                    if(i == boardSize-1){
                        return {
                            ...state,
                            winner: state.activePlayer,
                            typeWin: 'diagonal'
                        }
                    }
                }
            }

            //check anti diag
            for(let i = 0; i<boardSize; i++){
                if(state.board[getPositionByCoordinates(i, (boardSize-1)-i, boardSize)] != state.activePlayer)
                    break
                if(i == boardSize-1){
                    return {
                        ...state,
                        winner: state.activePlayer,
                        typeWin: 'antidiagonal'
                    }
                }
            }

            //check draw
            if(state.board.filter(v => v !== 0).length == (Math.pow(boardSize, 2) - 1)){
                return {
                    ...state, 
                    winner: 0
                }
            }

            return state;
        case 'CHANGE_PLAYER':
            return {
                ...state,
                activePlayer: state.activePlayer == 1 ? 2 : 1
            }
        default:
            return state
    }
}

const putButton = (position) => (dispatch, getState) => {
    if(typeof getState().winner != 'undefined') {
        return
    }

    dispatch({
        type: 'PUT_BUTTON',
        position
    })
    dispatch({
        type: 'CHECK_GAME_STATE',
        position
    })

    if(typeof getState().winner != 'undefined') {
        return
    }

    dispatch({
        type: 'CHANGE_PLAYER'
    })
}

export { putButton }
export default ticTacToeApp
