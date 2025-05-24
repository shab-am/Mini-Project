import { SHOW_DIALOG } from './types';

export const showDialog = ({ description, buttonText, title }) => (dispatch) => {
  dispatch({
    type: SHOW_DIALOG,
    payload: {
      description,
      buttonText,
      title,
      visible: true,
    },
  });
};

export const hideDialog = () => (dispatch) => {
  dispatch({
    type: SHOW_DIALOG,
    payload: {
      buttonText: '',
      title: '',
      description: '',
      visible: false,
    },
  });
};
