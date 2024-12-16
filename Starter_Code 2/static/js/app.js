// Get the metadata endpoint - Define url
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Promise Pending for JSON data from url
const dataPromise = d3.json(url);
  console.log("Data Promise: ", dataPromise);

// Initializing the dashboard using the init function
function init() {   

  // Fetch JSON data and console log it
  d3.json(url).then((data) => {
    console.log(data);
   
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Generate array of id names 
    let names = data.names;

    // Iterate through names and add to the dropdown menu
    names.forEach((name) => {
      dropdownMenu.append("option").text(name).property("value", name);
  });
    
    // Use the first sample ID to build the initial plots - Assign the first name to name variable
    let sample_one = names[0];

    // Print the value of sample_one
    console.log(sample_one);

    // Build the initial plots
    buildMetadata(sample_one);
    buildCharts(sample_one);
  });       
}

// Function to Populate the Bar and Bubble Charts
function buildCharts(sample) {
  d3.json(url).then((data) => {

    // Retrieve all sample data
    let samples = data.samples;

    // Filter based on the value of the sample
    let value = samples.filter(result => result.id == sample);

    // Check if value is not empty
    if (value.length > 0) {
      let valueData = value[0]; // Access the first element

      // Get data for charts from: the otu_ids, otu_labels, and sample_values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();

    // Build a Horizontal Bar Chart
    let bar_trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: "bar",
        orientation: "h",
    };

    let data1 = [bar_trace];

    // Render the Bar Chart
    let bar_layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" },
      yaxis: {
        zeroline: false,
        gridwidth: 2
      },
      showlegend: false,
      bargap: 0.05
    };

  Plotly.newPlot("bar", data1, bar_layout); 

    // Build a Bubble Chart
    let bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
          color: otu_ids,
          colorscale: 'Earth',
          size: sample_values
      }
    };

    let data2 = [bubble_trace]

    // Render the Bubble Chart
    let bubble_layout = {
    title: "Bacteria Cultures per Sample",
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Number of Bacteria" },
    showlegend: false,
    height: 550,
    width: 1000 
};

Plotly.newPlot("bubble", data2, bubble_layout);
      }
  });
}

// Function to populate metadata info
function buildMetadata(sample) {
  d3.json(url).then((data) => {

    // Retrieve all metadata
    let metadata = data.metadata;

    // Filter based on the value of the sample
    let value = metadata.filter(result => result.id == sample); 

    // Print the array of metadata objects
    console.log(value);

    // Check if value is not empty
    if (value.length > 0) {
      // Get the first index from the array
      let valueData = value[0];

    // Use d3 to select the panel with id of `#sample-metadata` and Clear metadata content to make it ready for user input
      d3.select("#sample-metadata").html("");

        // Object.entries() is a built-in method in JavaScript 
        // This returns an array of a given object's own enumerable property [key, value]
        let entries = Object.entries(valueData);
        
        // Iterate through the entries array
        // Add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
      } else {
        console.log("No metadata found for the selected sample");
      }    
    });
  }

// Function for event listener
function optionChanged(sample) {
    buildCharts(sample);
    buildMetadata(sample);
}

// Initialize the dashboard
init();
