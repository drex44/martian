import React from "react";
import PropTypes from "prop-types";

function PacketDataList({ packetList }) {
  return (
    <div>
      {packetList.map(packet => (
        <>
          <p>{packet.timestamp}</p>
          <p>{packet.data}</p>
        </>
      ))}
    </div>
  );
}

PacketDataList.propTypes = {
  packetList: PropTypes.array.isRequired
};

export default PacketDataList;
