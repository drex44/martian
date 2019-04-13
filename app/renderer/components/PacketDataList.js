import React from 'react';
import PropTypes from 'prop-types';

function PacketDataList({ packetList }) {
  return (
    <div>
      {packetList.map((packet, index) => (
        <React.Fragment key={index}>
          <p>{packet.timestamp}</p>
          <p>{packet.data}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

PacketDataList.propTypes = {
  packetList: PropTypes.array.isRequired,
};

export default PacketDataList;
