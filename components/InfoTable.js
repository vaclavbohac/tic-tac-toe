import React, { PropTypes } from 'react'

const InfoTable = (activePlayer) => (
    <div>
        Current player: <span>{activePlayer}</span>
    </div>
)

InfoTable.propTypes = {
    activePlayer: PropTypes.number.isRequired
}

export default InfoTable
