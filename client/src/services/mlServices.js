export const predictCoordinates = async (inputData) => {
    const response = await fetch('http://127.0.0.1:5050/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) throw new Error('Prediction failed');
    return await response.json();
  };