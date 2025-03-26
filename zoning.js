function calculateZoning() {
    const size = parseFloat(document.getElementById('size').value);
    const demand = parseFloat(document.getElementById('demand').value);
    const cost = parseFloat(document.getElementById('cost').value);
    
    if (isNaN(size) || isNaN(demand) || isNaN(cost)) {
      alert('Please enter valid values for all inputs.');
      return;
    }
  
    const predictedValue = size * demand  * 1000;  // Simplified prediction logic
    document.getElementById('output').innerHTML = `Predicted Property Value: $${predictedValue.toFixed(2)}`;
  }  