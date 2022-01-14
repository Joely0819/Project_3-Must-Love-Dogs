
//LINKING EVERYTHING INTO HTML:
// choose drop down id from html file 
var breedSelect = d3.select("#selDataset");
// select demo info div info
var infoTable = d3.select("#sample-metadata");
// establish all of your charts that are present in the html
var barChart = d3.select("#bar");
var bonusGauge = d3.select("gauge");

//DROPDOWN:
//populate dropdown menu with breeds
function dropdown() {resetData();
// reestablish connection to noodling.json file data 
d3.json("data/Final_Dog.json").then((data => {
    //Append breed names to the var breedSelect will add them to the drop down menu 
        data.names.forEach((name => {
                    var option = breedSelect.append("option");
                    option.text(name);
         
    })); 
// 1st ID and matching charts 
//("value") will choose each value in the names dictionary and add to drop down 
    var menuId = breedSelect.property("value")
plotCharts(menuId);
      })); 
} 

// reset so you can click a new number from the drop down list
function resetData() {
  //Clearing out all data
infoTable.html("");
barChart.html("");
bonusGauge.html("");

}; 


// PLOTTING
function plotCharts(BreedName) {d3.json("data/Final_dog.json").then((data => {
                                var individualdogMetadata = data.metadata.filter(participant => participant.BreedName == BreedName)[0];
                                var lifeSpan = individualdogMetadata.life_span;
  

// Iteration through each key
        Object.entries(individualdogMetadata).forEach(([key, value]) => {
            var newerList = infoTable.append("ul");
            newerList.attr("class", "list-group list-group-flush");
            var listItem = newerList.append("li");
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");
            // add pair to list
            listItem.text(`${key}: ${value}`);

        }); 

    //"id": BreedName
    //otu_id= BreedName 

        // filter
        var individualSample = data.metadata.filter(sample => sample.BreedName == BreedName)[0];
        // empty array to store data
        var barIds = [];
        var dogPrice = [];
        var sampleValues = [0, 100, 500, 1,000, 5,000];
        // Another Iteratation 
        Object.entries(individualSample).forEach(([key, value]) => {
switch (key) {case "BreedName": barIds.push(value);
break; 
case "AvgPupPrice":dogPrice.push(value);
break;
default:
break;} })
; 

// PLOTTING
var traceBar = {
    x: dogPrice,
    y: barIds,
    type: 'bar',
    orientation: 'h',
    marker: {color: 'rgb(64, 79, 54)'}};
        
var dataBar = [traceBar];
// plot layout
var layoutBar = {
    height: 400,
    width: 400,
    font: {family: 'Quicksand'},hoverlabel: {font: {family: 'Quicksand'}},
    title: {text: `<b>Average Purchase Price </b><br> for a ${BreedName} pup!</b>`,
    font: {size: 20 ,color: 'rgb(64, 79, 54)'}},
    xaxis: {title: "<b>Price $<b>",color: 'rgb(64, 79, 54)'},
    yaxis: {tickfont: { size: 13 }}}
    Plotly.newPlot("bar", dataBar, layoutBar);

// ***BONUS***
if (lifeSpan == '') 
{lifeSpan = 0;}
// create an indicator trace for the gauge chart
var traceGauge = {
    domain: { x: [0, 1], y: [0, 1] },
    value: lifeSpan,
    type: "indicator",
    mode: "gauge",
    gauge: {
        axis: {
        range: [0,20],
        tickmode: 'linear',
        tickvals: [0, 5, 10, 20],
        tickfont: {
        size: 15}},
//transparent because we will make another pointer below
bar: { color: 'rgb(87, 31, 39)' }, 
// choose all your colors 
steps: [
    { range: [0, 2], color: 'rgb(142, 195, 132)' },
    { range: [2, 4], color: 'rgb(131, 177, 120)' },
    { range: [4, 6], color: 'rgb(120, 160, 108)' },
    { range: [6, 8], color: 'rgb(109, 143, 96)' },
    { range: [8, 10], color: 'rgb(98, 126, 85)' },
    { range: [10, 12], color: 'rgb(86, 110, 74)' },
    { range: [12, 14], color: 'rgb(81, 102, 69)' },
    { range: [14, 16], color: 'rgb(75, 94, 64)' },
    { range: [16, 18], color: 'rgb(70, 87, 59)' },
    { range: [18, 20], color: 'rgb(64, 79, 54)' }
]}
    
};
//Meter pointer math 
var angle = (lifeSpan)/20 * 180;
var degrees = 180 - angle,
    radius = .8;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    cX = String(x),
    cY = String(y),
    pathEnd = ' Z';
var path = mainPath + cX + " " + cY + pathEnd;
    gaugeColors = ['rgb(8,29,88)', 'rgb(37,52,148)', 'rgb(34,94,168)', 'rgb(29,145,192)', 'rgb(65,182,196)', 'rgb(127,205,187)', 'rgb(199,233,180)', 'rgb(237,248,217)', 'rgb(255,255,217)', 'white']

    // center and track where the needle is centered 
var traceNeedleCenter = {
    type: 'scatter',
    showlegend: false,
    x: [0],
    y: [0],
    marker: { size: 35, color: '850000' },
    name: lifeSpan,
    hoverinfo: 'name'
        }; 

        // create a data array from the two traces
        var dataGauge = [traceGauge, traceNeedleCenter];

        // define a layout for the chart
        var layoutGauge = {

            // draw the needle pointer shape using path defined above
            shapes: [{type: 'path', 
                    path: path,
                    fillcolor: '850000',
                    line: {color: '850000'}
            }],
            font: {family: 'Quicksand'},
            hoverlabel: {font: {family: 'Quicksand',size: 16}},
            title: {text: `<b>Dog Breed: ${BreedName}</b><br><b>Life Span</b><br>Average in Years`,
            font: {size: 20 ,color: 'rgb(64, 79, 54)'},},
            height: 400,
            width: 400,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1],
                fixedrange: true},
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-0.5, 1.5],
                fixedrange: true}
        };
Plotly.newPlot('gauge', dataGauge, layoutGauge);
})); 
}; 
//function for id change
function optionChanged(BreedName) {
// reset one last time
    resetData();
    plotCharts(BreedName);} 
dropdown();