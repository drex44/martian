import { connect } from 'react-redux';
import RequestTabList from '../components/RequestTabList';
import { bindActionCreators } from 'redux';
import requestsActions from '../actions/requests';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  const requests = bindActionCreators(requestsActions, dispatch);
  return {
    onAddNewRequest: () => {
      requests.addNewRequest();
    },
    onDeleteRequest: (data) => {
      requests.deleteRequest(data);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestTabList);
