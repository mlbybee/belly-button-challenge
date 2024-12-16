# Module 14 Challenge | belly-button-challenge

# Project Objectives:
Build and interactive dashboard to explore the Belly Button Biodiversity data set, which catalogs the microbes that colonize human navels. This data was collected by North Carolina State University in The Public Science Lab. This dataset only examines a small handful of microbial species (also called operational taxonomic units, or OTUs) that were present in more than 70% of individuals. The rest of the species are relatively rare.

# Programming and Software:
- Javascript
- D3 Library
- HTML
- Plotly

# Project Overview:

Initializing the Dashboard:
- Define the url pointing to the JSON source
- Fetch the metadata using d3.json(url)
- Add the dataPromise log to the console
- Initialize the function using init(); defined to fetch JSON data, populate the dropdown menu, and build the initial plots

Build Charts (Bar and Bubble) Function:
- Fetch metadata from the JSON data
- Filters the metadata on the sample parameters using filter method
- Check the output
- Extract the metadata from otu_ids, otu_labels, and sample_values
- Log the extracted data to the console for debugging purposes
- Prepare data for the bar chart using the top 10 items and recersing the order to diplay the hightest values
- Use Plotly to create a horizontal bar chart with the prepared data
- Prepare data for the bubble chart using all otu_ids and sample_values. The markers' color is determined by the otu_ids, and their size is determined by sample_values
- Use Plotly to create a bubble chart
- Use https://plotly.com/javascript/ to assist with code for charts

Build Metadata Function:
- Fetches metadata from the JSON data
- Filters the metadat based on the selected sample
- Clears any existing metadata in the panel
- Interates through the metadata entries and appends them to the HTML element 

OptionChanged Function:
- Triggered when a new sample is selected from the dropdown menu
- Calls both buildCharts and buildMetadata to refresh the displayed data

# HTML Output Dashboard Features:
1) Drop Down Menu
* Select the Test Subject ID No with the drop down menu to toggle the visualizations on the dashboard 

2) Demographic Info Panel
* Displays the demographic information of the chosen Test Subject ID
* Displays each key-value pair from the metadata JSON object

3) Horizontal Bar Graph
* Generated when a Test Subject is selected from the drop down menu
* Displays the top 10 OTUs found in the Test Subject selected
* Hovering over the bars and it will display the otu_labels - presented as hovertext 

4) Bubble Chart
* Generated when a Test Subject is selected from the drop down menu
* Each sample will display as a bubble of varying sizes
* On the chart: the x values are the otu_ids, the y values are the sample_values
* The colors of the bubbles are based on otu_ids, and the hovertext are the otu_labels

# Support Received:
* Lectures
* Xpert Learning
* Stack Overflow
* https://plotly.com/javascript/

