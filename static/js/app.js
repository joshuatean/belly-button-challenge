// Declare URL for data retrieval
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Declare initialize function and call drawcharts and draw demographics functions
function initialize()   {
    // Select dropdown element
    let dropdown = d3.select("#selDataset");
    d3.json(url).then(function (data)   {
        let names = data.names;
        names.forEach((i) => {
            dropdown.append("option").text(i).property("value", i)
        });
    // Declare first sample as x
    let x = names[0];
    drawcharts(x);
    drawdemo(x);
    });
};

// Declare drawcharts function
function drawcharts(i)  {
    d3.json(url).then(function (data)   {
        console.log(data);
        // Declare all required variables
        let meta = data.metadata;
        let samples = data.samples;
        let result = samples.filter(row => row.id == i);
        let metainfo = meta.filter(row => row.id == i);
        let values = result[0].sample_values;
        let ids = result[0].otu_ids;
        let otulabels = result[0].otu_labels;
        let labelsslicedreversed = otulabels.slice(0, 10).reverse();
        let slicedreversed = values.slice(0, 10).reverse();
        let idscleaned = ids.slice(0, 10).reverse();
        let washedcount = metainfo[0].wfreq;
        
        // Create barchart
        let bars = [{
                x: slicedreversed,
                y: idscleaned.map(ids => `OTU${ids}`),
                text: labelsslicedreversed,
                type: "bar",
                orientation: "h",
        }];
        let layout = {
            title: `Top 10 Microbial Species in Belly Buttons`,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            },
        };
        Plotly.newPlot("bar", bars, layout);
        
        // Create bubble chart
        let bubbles = [{
                x: ids,
                y: values,
                text: otulabels,
                mode: "markers",
                marker: {
                    size: values,
                    color: ids,
                },
        }];
        let bubs_layout = {
            title: "Bubble Chart on Microbial Species in Belly Buttons",
            xaxis: {title: "OTU ID"},
            showlegend: false,
        };
        Plotly.newPlot("bubble", bubbles, bubs_layout);
        
        // Create Gauge chart
        let gauges = [{
            domain: { x: [0, 1], y: [0, 1]},
            type: "indicator",
            mode: "gauge+number",
            value: washedcount,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week"},
            gauge: {
                axis: {range: [null, 9]},
                bar: {color: "black"},
                steps: [
                    {range: [0,1], color: "#f7f2ec"},
                    {range: [1,2], color: "#f3f0e5"},
                    {range: [2,3], color: "#e9e7c9"},
                    {range: [3,4], color: "#e5e9b1"},
                    {range: [4,5], color: "#d5e595"},
                    {range: [5,6], color: "#b7cd8b"},
                    {range: [6,7], color: "#87c080"},
                    {range: [7,8], color: "#85bc8b"},
                    {range: [8,9], color: "#80b586"}
                ],
            },
        }];
        let gauge_layout = {
            automargin: true
        };
        Plotly.newPlot("gauge", gauges, gauge_layout);
    });
};

// Declare draw demographics function to fill information for the infobox
function drawdemo(i)     {
    let infobox = d3.select("#sample-metadata");
    // Read json url
    d3.json(url).then(function (data) {
        // Get the metadata
        let meta = data.metadata;
        let metainfo = meta.filter(row => row.id == i);
        // Clear the infobox before filling it with new data
        infobox.html("");
        // Append new data to the infobox
        metainfo.forEach((row) => {
        for (const [key, value] of Object.entries(row)) {
            infobox.append("h5").text(`${key}:${value}`)};
        });
    });   
};

// Declare function to update a new sample
function optionChanged(j)   {
    drawcharts(j);
    drawdemo(j);
};

initialize();