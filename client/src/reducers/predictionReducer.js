const initialState = {
  predictedCoordinates: null,
};

export default function predictionReducer(state = initialState, action) {
  console.log("predictionReducer - action:", action);
  switch (action.type) {
    case 'SET_PREDICTED_COORDINATES':
      return { ...state, predictedCoordinates: action.payload };
    default:
      return state;
  }
}
