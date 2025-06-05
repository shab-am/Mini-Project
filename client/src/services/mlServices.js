export const predictCoordinates = async (inputData) => {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) throw new Error('Prediction failed');
    return await response.json();
  };