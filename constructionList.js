let overallTotal = 0;

function addMaterial() {
  const materialName = document.getElementById('material').value;
  const quantity = parseFloat(document.getElementById('quantity').value);
  const unitCost = parseFloat(document.getElementById('unitCost').value);

  if (!materialName || isNaN(quantity) || isNaN(unitCost)) {
    alert('Please enter valid data for all fields.');
    return;
  }

  const totalCost = quantity * unitCost;
  overallTotal += totalCost;

  const table = document.getElementById('materialsTable');
  const row = table.insertRow(-1);
  row.insertCell(0).innerText = materialName;
  row.insertCell(1).innerText = quantity;
  row.insertCell(2).innerText = unitCost.toFixed(2);
  row.insertCell(3).innerText = totalCost.toFixed(2);

  document.getElementById('totalCost').innerText = 
    `Total Cost: $${overallTotal.toFixed(2)}`;

  // Reset inputs
  document.getElementById('material').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('unitCost').value = '';
}