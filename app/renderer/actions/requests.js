import { createAction } from 'redux-actions';

export default {
  saveRequest: createAction('REQUEST_SAVE'),
  deleteRequest: createAction('REQUEST_DELETE'),
  addNewRequest: createAction('REQUEST_ADD_NEW'),
};
