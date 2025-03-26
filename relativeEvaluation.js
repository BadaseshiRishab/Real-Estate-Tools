function evaluateProperty() {
    const supplyDemand = parseFloat(document.getElementById('supplyDemandIndex').value);
    const macro = parseFloat(document.getElementById('macroIndex').value);
    const socio = parseFloat(document.getElementById('socioIndex').value);
    const zoning = parseFloat(document.getElementById('zoningIndex').value);
  
    if (isNaN(supplyDemand) || isNaN(macro) || isNaN(socio) || isNaN(zoning)) {
      alert('Please enter valid numeric values for all fields.');
      return;
    }
  
    // Example "ML" approach: a simple linear model with pre-trained weights
    // In a real application, you'd train or import these weights from a model.
    const baseValue = 50000;
    const wSupply = 30000;
    const wMacro = 40000;
    const wSocio = 20000;
    const wZoning = 15000;
  
    const predictedCost = baseValue 
                          + (wSupply * supplyDemand) 
                          + (wMacro * macro) 
                          + (wSocio * socio) 
                          + (wZoning * zoning);
  
    document.getElementById('output').innerHTML =
      `Predicted Relative Property Cost: $${predictedCost.toFixed(2)}`;
  }  