function calculateFinancials() {
  // 1. Gather inputs
  const financingOption = document.getElementById('financingOption').value;
  const totalInvestment = parseFloat(document.getElementById('totalInvestment').value);
  const constructionMonths = parseFloat(document.getElementById('constructionMonths').value);
  const expectedMonthlyIncome = parseFloat(document.getElementById('expectedMonthlyIncome').value);
  const financingCost = parseFloat(document.getElementById('financingCost').value);

  // 2. Validate
  if (
    isNaN(totalInvestment) ||
    isNaN(constructionMonths) ||
    isNaN(expectedMonthlyIncome) ||
    isNaN(financingCost)
  ) {
    alert('Please fill all fields with valid numbers.');
    return;
  }

  // 3. Calculate total income for 12 months post-construction
  //    (If you want partial months or different assumptions, adjust here.)
  const totalIncomeAfterConstruction = expectedMonthlyIncome * 12;

  // 4. Compute net profit (just an example):
  //    Net Profit = (Total Income) - (Total Investment + Financing Cost)
  const netProfit = totalIncomeAfterConstruction - (totalInvestment + financingCost);

  // 5. Build the output text (mimicking your example's style)
  let outputHtml = '';
  outputHtml += `<p>📌 <strong>Financing Option:</strong> ${financingOption}</p>`;
  outputHtml += `<p><strong>Total Investment:</strong> $${totalInvestment.toFixed(2)}</p>`;
  outputHtml += `<p><strong>Total Expected Income (12 months post-construction):</strong> $${totalIncomeAfterConstruction.toFixed(2)}</p>`;
  outputHtml += `<p><strong>Financing Cost:</strong> $${financingCost.toFixed(2)}</p>`;
  outputHtml += `<p><strong>Net Profit (after financing cost):</strong> $${netProfit.toFixed(2)}</p>`;

  // 6. Inject into the page
  document.getElementById('financialOutput').innerHTML = outputHtml;
}
