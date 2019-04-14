import React from 'react';
import PropTypes from 'prop-types';

function PacketDataList({ packetList, incoming }) {
  return (
    <div>
      {packetList.map((packet, index) => (
        <React.Fragment key={index}>
          <article className={['message', incoming ? 'is-success' : 'is-warning'].join(' ')}>
            <div className="message-body">
              <p>{packet.timestamp}</p>
              <strong>
                <p>{incoming ? packet.message : JSON.stringify(packet.message)}</p>
              </strong>
            </div>
          </article>
        </React.Fragment>
      ))}
    </div>
  );
}

PacketDataList.propTypes = {
  packetList: PropTypes.array.isRequired,
};

export default PacketDataList;
