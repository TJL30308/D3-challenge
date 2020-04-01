// read in CSV and console log check
d3.csv("static/data/data.csv").then(data => console.log(data));

var svg = d3.select("scatter").append("svg")
            .attr(width, "500")
            .attr(height, "250")
            .append("g");

svg.append("");


