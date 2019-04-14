import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from '../../app/renderer/actions/requests';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  describe('requests', () => {
    it('should add new request', () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: 'REQUEST_ADD_NEW',
        },
      ];

      store.dispatch(actions.addNewRequest());

      expect(store.getActions()).deep.equal(expectedActions);
    });

    it('should save request', () => {
      const store = mockStore({});
      const expectedActions = [
        {
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
        },
      ];

      store.dispatch(
        actions.saveRequest({
          id: 0,
          name: 'New Tab',
          url: 'wss://echo.websocket.org/',
          message: '',
          headers: [],
          outgoingData: [],
          incomingData: [],
        }),
      );

      expect(store.getActions()).deep.equal(expectedActions);
    });

    it('should delete a request', () => {
      const store = mockStore({});
      const expectedActions = [
        {
          type: 'REQUEST_DELETE',
          payload: 0,
        },
      ];

      store.dispatch(actions.deleteRequest(0));

      expect(store.getActions()).deep.equal(expectedActions);
    });
  });
});
