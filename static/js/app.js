const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function initialize()   {
    let dropdown = d3.select("#selDataset");
    d3.json(url).then(function(data)    {
        console.log(data);
        let samples = data.names;
        samples.forEach((detail) => {
            dropdown.append("option").text(detail).property("value", detail);
        });
    drawcharts(samples[0]);
    });
};

initialize();