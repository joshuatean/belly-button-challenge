const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function initialize()   {
    let dropdown = d3.select("#selDataset");
    d3.json(url).then(function (data)   {
        let names = data.names;
        names.forEach((i) => {
            dropdown.append("option").text(i).property("value", i)
        });
    let x = names[0];
    drawcharts(x);
    drawdemo(x);
    });
};

function drawcharts(i)  {
    d3.json(url).then(function (data)   {
        console.log(data);
        let meta = data.metadata;
        let samples = data.samples;
        let result = samples.filter(row => row.id == i);
        let metainfo = meta.filter(row => row.id == i)[0];
        let values = result[0].sample_values;
        let ids = result[0].otu_ids;
        let labels = result[0].otu_labels;
        let labelsslicedreversed = labels.slice(0, 10).reverse();
        let slicedreversed = values.slice(0, 10).reverse();
        let idscleaned = ids.slice(0, 10).reverse();

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

        let bubbles = [{
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    size: values,
                    color: ids,
                },
        }];

        let bubs_layout = {
            title: "Bubble Chart on Microbial Species in Belly Buttons",
            showlegend: false,
        };
        Plotly.newPlot("bubble", bubbles, bubs_layout);
    });
};

function drawdemo(i)     {
    let infobox = d3.select("#sample-metadata");
    d3.json(url).then(function (data) {
        let meta = data.metadata;
        let metainfo = meta.filter(row => row.id == i);
        infobox.html("");
        metainfo.forEach((row) => {
        for (const [key, value] of Object.entries(row)) {
            infobox.append("h5").text(`${key}:${value}`)};
        });
    });   
};

function optionChanged(j)   {
    drawcharts(j);
    drawdemo(j);
};

initialize();