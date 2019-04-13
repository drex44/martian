import { handleActions } from 'redux-actions';
import actions from '../actions/requests';
import _ from 'lodash';

export default handleActions(
  {
    [actions.saveRequest]: (state, action) => {
      const index = _.findIndex(state.requests, { id: action.payload.id });
      if (index >= 0) state.requests[index] = action.payload;
      return { ...state };
    },
    [actions.deleteRequest]: (state, action) => {
      const { requests } = state;
      requests.splice(action.payload, 1);
      return { ...state };
    },
    [actions.addNewRequest]: (state) => {
      const requests = [...state.requests, { id: state.count, name: 'New Tab' }];
      state.requests = requests;
      state.count++;
      return { ...state };
    },
  },
  { requests: [{ id: 0, name: 'New Tab' }], count: 1 },
);
