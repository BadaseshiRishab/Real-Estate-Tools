function calculateEmotionalAppeal() {
    const aesthetic = parseInt(document.getElementById('aestheticScore').value);
    const view = parseInt(document.getElementById('viewScore').value);
    const amenity = parseInt(document.getElementById('amenityScore').value);
  
    if (isNaN(aesthetic) || isNaN(view) || isNaN(amenity)) {
      alert('Please enter valid values for all inputs.');
      return;
    }
  
    const appealScore = (aesthetic + view + amenity) / 3;
    document.getElementById('emotionalOutput').innerHTML = `Predicted Emotional Appeal Score: ${appealScore.toFixed(2)}`;
  }  