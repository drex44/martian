import { expect } from 'chai';
import reducer from '../../app/renderer/reducers/requests';
import _ from 'lodash';

describe('reducers', () => {
  describe('requests', () => {
    it('should handle REQUEST_ADD_NEW', () => {
      const action = {
        type: 'REQUEST_ADD_NEW',
      };
      const initialState = { requests: [{ id: 0, name: 'New Tab' }], count: 1 };
      const test = {
        requests: [...initialState.requests, { id: initialState.count, name: 'New Tab' }],
        count: initialState.count + 1,
      };
      expect(reducer(initialState, action)).to.deep.equal(test);
    });

    it('should handle REQUEST_DELETE', () => {
      const action = {
        type: 'REQUEST_DELETE',
        payload: 0,
      };
      const initialState = { requests: [{ id: 0, name: 'New Tab' }], count: 1 };
      const newRequsts = [...initialState.requests];
      newRequsts.splice(action.payload, 1);
      const test = {
        requests: newRequsts,
        count: initialState.count,
      };

      expect(reducer(initialState, action)).to.deep.equal(test);
    });

    it('should handle REQUEST_SAVE', () => {
      const action = {
        type: 'REQUEST_SAVE',
        payload: {
          id: 0,
          name: 'New Tab',
          url: 'wss://echo.websocket.org/',
          message: '',
          headers: [],
          outgoingData: [],
          incomingData: [],
        },
      };
      const initialState = { requests: [{ id: 0, name: 'New Tab' }], count: 1 };
      const newRequsts = [...initialState.requests];

      const index = _.findIndex(newRequsts, { id: action.payload.id });
      if (index >= 0) newRequsts[index] = action.payload;

      const test = {
        requests: newRequsts,
        count: initialState.count,
      };

      expect(reducer(initialState, action)).to.deep.equal(test);
    });
  });
});
