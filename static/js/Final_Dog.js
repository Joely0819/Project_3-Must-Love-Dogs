//"id": 940, 
//"ethnicity": "Caucasian", 
//"gender": "F", 
//"age": 24.0, 
//"location": "Beaufort/NC", 
//"bbtype": "I", 
//"wfreq": 2.0}
//Check to make sure the data reads in the console 
d3.json('data/noodling.json').then(data => console.log(data))
// choose drop down id from html file 
var breedSelect = d3.select("#selDataset");
// select demo info div info
var infoTable = d3.select("#sample-metadata");
// establish all of your charts that are present in the html
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");
var bonusGauge = d3.select("gauge");

//populate dropdown menu with breeds
function dropdown() {resetData();
// reestablish connection to noodling.json file data 
    d3.json("data/noodling.json").then((data => {
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
bubbleChart.html("");
bonusGauge.html("");

}; 

// PLOTTING
function plotCharts(BreedName) {
//read json wiith d3
d3.json("data/noodling.json").then((data => {
var individualdogMetadata = data.metadata.filter(participant => participant.BreedName == BreedName)[0];
var AvgPupPrice = individualdogMetadata.AvgPupPrice;
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
        
        
        

// ***BONUS***
if (lifeSpan == null) 
{lifeSpan = 0;}
// create an indicator trace for the gauge chart
var traceGauge = {
    domain: { x: [0, 1], y: [0, 1] },
    value: lifeSpan,
    type: "indicator",
    mode: "gauge",
    gauge: {axis: {
    range: [0, 20],
    tickmode: 'linear',
    tickfont: {
    size: 15}},
//transparent because we will make another pointer below
bar: { color: 'rgb(87, 31, 39)' }, 
// choose all your colors 
steps: [
    { range: [0, 5], color: 'rgb(185, 224, 244)' },
    { range: [5, 10], color: 'rgb(164, 212, 239)' },
    { range: [10, 15], color: 'rgb(134, 193, 232)' },
    { range: [15, 20], color: 'rgb(114, 181, 228)' }]}
    
};
//Meter pointer math 
var angle = (lifeSpan/ 20) * 180;
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
            title: {text: `<b>Test Subject ${BreedName}</b><br><b>Breed Life Span</b><br><br>Average in Years`,
            font: {size: 20,color: 'rgb(42, 136, 212)'},},
            height: 500,
            width: 500,
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