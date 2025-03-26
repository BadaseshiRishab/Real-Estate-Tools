// Our enhanced config object with multiple images and multiple charts
// Each property type has:
//   images: an array of image file paths
//   demandChart: { label, data, labels }
//   roiChart:    { label, data, labels }
const visualConfig = {
    residential: {
      images: [
        "assets/residential_exterior.jpg",
        "assets/residential_interior.jpg",
        "assets/residential_floorplan.jpg"
      ],
      demandChart: {
        label: "Residential Demand",
        data: [0.5, 0.55, 0.6, 0.65, 0.7],
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"]
      },
      roiChart: {
        label: "Residential ROI (%)",
        data: [4, 5, 6, 7, 8],  // example ROI data
        labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]
      }
    },
    commercial: {
      images: [
        "assets/commercial_exterior.jpg",
        "assets/commercial_interior.jpg",
        "assets/commercial_floorplan.jpg"
      ],
      demandChart: {
        label: "Commercial Demand",
        data: [0.7, 0.8, 0.9, 0.85, 0.88],
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"]
      },
      roiChart: {
        label: "Commercial ROI (%)",
        data: [5, 6, 8, 9, 10],
        labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]
      }
    },
    industrial: {
      images: [
        "assets/industrial_exterior.jpg",
        "assets/industrial_interior.jpg",
        "assets/industrial_floorplan.jpg"
      ],
      demandChart: {
        label: "Industrial Demand",
        data: [0.4, 0.45, 0.5, 0.55, 0.6],
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5"]
      },
      roiChart: {
        label: "Industrial ROI (%)",
        data: [3, 3.5, 4, 4.5, 5],
        labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]
      }
    }
  };
  
  /**
   * Called when user clicks "Generate Visuals".
   * Displays multiple images, plus a Demand chart and an ROI chart.
   */
  function generateVisuals() {
    // 1. Get user inputs
    const propertyType = document.getElementById('propertyType').value;
    const timeRangeStr = document.getElementById('timeRange').value.trim();
  
    if (!propertyType) {
      alert("Please select a property type.");
      return;
    }
    if (!timeRangeStr) {
      alert("Please enter a time range in months.");
      return;
    }
  
    const timeRange = parseInt(timeRangeStr, 10);
    if (isNaN(timeRange) || timeRange <= 0) {
      alert("Time range must be a positive number.");
      return;
    }
  
    // 2. Lookup config for chosen property type
    const config = visualConfig[propertyType];
    if (!config) {
      alert("No visual config found for this property type.");
      return;
    }
  
    // 3. Clear previous content
    const outputDiv = document.getElementById('visualsOutput');
    outputDiv.innerHTML = "";
  
    // 4. Insert all relevant images
    const imageContainer = document.createElement('div');
    imageContainer.style.display = "flex";
    imageContainer.style.flexWrap = "wrap";
    imageContainer.style.gap = "1rem";
    imageContainer.style.justifyContent = "center";
  
    config.images.forEach(imgPath => {
      const img = document.createElement('img');
      img.src = imgPath;
      img.alt = propertyType + " property";
      img.style.maxWidth = "250px";
      img.style.borderRadius = "6px";
      img.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
      imageContainer.appendChild(img);
    });
  
    outputDiv.appendChild(imageContainer);
  
    // 5. Create Demand chart
    const demandHeading = document.createElement('h3');
    demandHeading.textContent = `Demand Chart for ${capitalize(propertyType)}`;
    outputDiv.appendChild(demandHeading);
  
    const demandCanvas = document.createElement('canvas');
    demandCanvas.id = "demandChart";
    demandCanvas.width = 400;
    demandCanvas.height = 200;
    outputDiv.appendChild(demandCanvas);
  
    buildLineChart(
      demandCanvas.getContext('2d'),
      config.demandChart,
      timeRange,
      "Demand Index (0-1)"
    );
  
    // 6. Create ROI chart
    const roiHeading = document.createElement('h3');
    roiHeading.textContent = `ROI Chart for ${capitalize(propertyType)}`;
    outputDiv.appendChild(roiHeading);
  
    const roiCanvas = document.createElement('canvas');
    roiCanvas.id = "roiChart";
    roiCanvas.width = 400;
    roiCanvas.height = 200;
    outputDiv.appendChild(roiCanvas);
  
    buildLineChart(
      roiCanvas.getContext('2d'),
      config.roiChart,
      5, // timeRange for ROI might be different (5 years?), or you can just use "timeRange" if you want
      "ROI (%)"
    );
  }
  
  /**
   * Helper function: Build a line chart using Chart.js
   * dataObj has { label, data, labels }
   * length: how many points to show (e.g., user-chosen timeRange)
   * yLabel: label for Y axis
   */
  function buildLineChart(ctx, dataObj, length, yLabel) {
    // 1. Possibly slice or extend the data based on "length"
    let chartLabels = [...dataObj.labels];
    let chartData = [...dataObj.data];
  
    // If user wants more points than we have
    if (length > chartLabels.length) {
      // Example: extend the data randomly or repeat last value
      const lastVal = chartData[chartData.length - 1];
      const lastLabel = chartLabels[chartLabels.length - 1];
      const baseNum = parseInt(lastLabel.replace(/\D/g, ''), 10) || chartLabels.length; 
      for (let i = chartLabels.length + 1; i <= length; i++) {
        chartLabels.push(`Month ${i}`); // or "Year i" if it's an ROI chart
        // extend data by random or by repeating
        chartData.push((parseFloat(lastVal) + (Math.random() * 0.1)).toFixed(2));
      }
    } else if (length < chartLabels.length) {
      // slice down
      chartLabels = chartLabels.slice(0, length);
      chartData = chartData.slice(0, length);
    }
  
    // 2. Build the chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: dataObj.label,
          data: chartData,
          fill: false,
          borderColor: '#007bff',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: yLabel
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: dataObj.label
          }
        }
      }
    });
  }
  
  /** Capitalize first letter helper */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  