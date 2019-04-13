import { connect } from 'react-redux';
import RequestTabList from '../components/RequestTabList';

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RequestTabList);
