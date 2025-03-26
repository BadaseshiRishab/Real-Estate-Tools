function calculateScenario() {
    const demand = parseFloat(document.getElementById('scenarioDemand').value);
    const cost = parseFloat(document.getElementById('scenarioCost').value);
    
    if (isNaN(demand) || isNaN(cost)) {
      alert('Please enter valid values for all inputs.');
      return;
    }
  
    const factor = 500000;  // Can be adjusted as needed
    const adjustedDemand = Math.max(demand, 0.05);  // Ensure there's always a minimum demand of 5% to avoid zero values
    const scenarioValue = adjustedDemand * factor - cost;

    document.getElementById('scenarioOutput').innerHTML = `Scenario Projected Value: $${scenarioValue.toFixed(2)}`;
  }  