// 1. Define your marketing channels (same order as the weights we’ll provide)
const channelsData = [
  { channel: 'Social Media Ads (CTR)', kpi: 'Click Through Rate' },
  { channel: 'Google Ads',            kpi: 'Cost per Lead' },
  { channel: 'Email Campaigns',       kpi: 'Open Rate' },
  { channel: 'Local Events & Networking', kpi: 'Leads per Event' },
  { channel: 'Real Estate Portals (like Zillow)', kpi: 'Listing Views' }
];

// 2. Define a “weight map” for propertyType + targetAudience combos.
//    Each array must have exactly as many entries as channelsData above.
const weightingMap = {
  residential: {
    investors:            [0.25, 0.20, 0.15, 0.20, 0.20], // example
    'first-time buyers':  [0.30, 0.10, 0.25, 0.20, 0.15], // example
    default:              [0.20, 0.20, 0.20, 0.20, 0.20]
  },
  commercial: {
    investors:            [0.15, 0.30, 0.10, 0.15, 0.30],
    'first-time buyers':  [0.10, 0.25, 0.20, 0.15, 0.30],
    default:              [0.20, 0.20, 0.20, 0.20, 0.20]
  },
  // If the property type doesn’t match anything above, fall back to these:
  default:               [0.20, 0.20, 0.20, 0.20, 0.20]
};

// 3. Helper function to pick the correct weight array
function getWeights(propertyType, targetAudience) {
  // Convert to lowercase so matching is easier
  const typeKey = propertyType.toLowerCase();
  const audienceKey = targetAudience.toLowerCase();

  // 1) If property type is recognized
  if (weightingMap[typeKey]) {
    // 2) If that type has an exact match for the audience
    if (weightingMap[typeKey][audienceKey]) {
      return weightingMap[typeKey][audienceKey];
    } 
    // Otherwise, use that type's "default"
    return weightingMap[typeKey].default;
  }

  // If we don't recognize the property type at all, use the overall default
  return weightingMap.default;
}

function generatePlan() {
  // 4. Gather inputs
  const budget = parseFloat(document.getElementById('budget').value);
  const targetAudience = document.getElementById('targetAudience').value.trim();
  const propertyType = document.getElementById('propertyType').value.trim();

  // 5. Validate
  if (isNaN(budget) || !targetAudience || !propertyType) {
    alert('Please fill all fields correctly (Budget must be a number).');
    return;
  }

  // 6. Get the correct weight array
  const weights = getWeights(propertyType, targetAudience);

  // Optional check: confirm weights sum to ~1.0
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  if (Math.abs(totalWeight - 1.0) > 0.0001) {
    console.warn(`Warning: total weight = ${totalWeight}, not 1.0`);
  }

  // 7. Build the output HTML
  let html = '';
  html += `<h2>📌 Marketing Plan for ${propertyType} targeting ${targetAudience} with total budget: $${budget.toFixed(2)}</h2>`;
  html += `<table style="margin: 20px auto; border-collapse: collapse;">`;
  html += `
    <tr>
      <th style="border: 1px solid #ccc; padding: 8px;">Channel</th>
      <th style="border: 1px solid #ccc; padding: 8px;">KPI</th>
      <th style="border: 1px solid #ccc; padding: 8px;">Budget Allocation</th>
    </tr>
  `;

  // 8. Loop over channels and apply the correct weight
  channelsData.forEach((item, index) => {
    const channelAllocation = budget * weights[index];
    html += `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">${item.channel}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${item.kpi}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">$${channelAllocation.toFixed(2)}</td>
      </tr>
    `;
  });

  html += `</table>`;
  html += `<p style="color: green; font-weight: bold;">✔ Marketing plan generated based on target audience and property type.</p>`;

  // 9. Inject into the page
  document.getElementById('planOutput').innerHTML = html;
}
