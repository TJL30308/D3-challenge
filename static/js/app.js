function makeResponsive() {
    
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
        };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("scatter")
                .append("svg")
                .attr(width, svgWidth)
                .attr(height, svgHeight);

    // read in CSV and console log check
    d3.csv("static/data/data.csv").then(data => console.log(data));

}

makeResponsive();
