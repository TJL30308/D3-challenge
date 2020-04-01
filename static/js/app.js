// wrap everything in makeResponsive function to make chart respond to screen size
function makeResponsive() {

    var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

    var svgWidth = 1200;
    var svgHeight = 600;

    var margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // read in CSV and console log check
    d3.csv("static/data/data.csv").then(function(data) {
        
        console.log(data)

        // Parse through data
        data.forEach(function(data) { 
            data.income = +data.income;
            data.obesity = + data.obesity;
        });
    
        console.log(data.income);
        console.log(data.obesity);
    
        // Create scale functions
        var xLinearScale = d3.scaleLinear()
            .domain([20, d3.max(data, d => d.income)])
            .range([0, width]);
    
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.obesity)])
            .range([height, 0]);

        // Create axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Append axes to chart
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
    
        chartGroup.append("g")
            .call(leftAxis);

        // Create circles
        var circleGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.income))
            .attr("cy", d => yLinearScale(d.obesity))
            .attr("r", "10")
            .attr("fill", "pink")
            .attr("opacity", "0.5");
    
        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 1.5))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Rate of Obesity (% of Population)");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Average Annual Income ($USD)");
    
    }).catch(function(error) {
        console.log(error);
    });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);
