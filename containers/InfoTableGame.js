import { connect } from 'react-redux'
import InfoTable from '../components/InfoTable'

const mapStateToProps = (state) => {
    return {
        activePlayer: state.activePlayer
    }
}

const InfoTableGame = connect(mapStateToProps)(InfoTable)

export default InfoTableGame