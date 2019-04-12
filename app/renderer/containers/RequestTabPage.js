import { connect } from "react-redux";
import RequestTab from "../components/RequestTab";

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(RequestTab);
