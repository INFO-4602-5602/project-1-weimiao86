//Global
var selectedData = "anscombe_I.csv";
//switch among the data source
function changeDateset(){
  selectedData=document.getElementById("dataSelect").value.toString();
  updatePartTwo(selectedData);
  updatePartThree(selectedData);
}


//MarK: Part One code //////////////////////////////////////////////////////////////////

//Create an array to store csv file names
var csvFile = ["anscombe_I.csv", "anscombe_II.csv", "anscombe_III.csv", "anscombe_IV.csv"];

//Check if each csv file loaded successfully by printing its name out
csvFile.forEach(function(item) {
  d3.csv("/data/" + item, function(data) {
    checkDataset(data, item);
  });
});

// Leave this to test your data uploading. All data uploading should be above this line
function checkDataset(dataset, fileName) {
  if (dataset.length == 11)
    $("#partOne").append("<p>" + fileName + " loaded correctly!</p>");
  else
    $("#partOne").append("<p>data loaded incorrectly. Try using the debugger to help you find the bug!</p>");
  }



//Mark: Part Two code here //////////////////////////////////////////////////////////////////
//margin of part two chart
var p2Margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50
};

//width and height of part two chart
var p2Width = 600 - p2Margin.left - p2Margin.right;
var p2Height = 500 - p2Margin.top - p2Margin.bottom;

//set ranges
var p2x = d3.scaleLinear().range([0, p2Width]);
var p2y = d3.scaleLinear().range([p2Height, 0]);

//define xy axis
var p2xAxis = d3.axisBottom()
              .scale(p2x);
var p2yAxis = d3.axisLeft()
              .scale(p2y);

//tooltip
var p2_tp = d3.select("#scatterplots")
              .append("div")
              .attr("class", "tooltip")
              .style("opacity",0);

//append svg to partTwo
var p2Svg = d3.select("#scatterplots")
              .append("svg")
              .attr("width", p2Width + p2Margin.left + p2Margin.right)
              .attr("height", p2Height + p2Margin.top + p2Margin.bottom)
              .append("g")
              .attr("transform", "translate(" + p2Margin.left + "," + p2Margin.top + ")");

//get the data
d3.csv("/data/" + csvFile[0], function(error, csvData) {
  if (error) throw error;

  //format the data: string to number
  csvData.forEach(function(d){
    d.x= +d.x;
    d.y= +d.y;
  });

  //scale the range of data
  p2x.domain([d3.min(csvData, function(d){return d.x;})-1,d3.max(csvData, function(d){return d.x;})+1]);
  p2y.domain([0, d3.max(csvData, function(d) {return d.y;})+1]);

  //add the scatterplot
  p2Svg.selectAll("circle")
        .data(csvData)
        .enter()
        .append("circle")
        .attr("class", "scDots")
        .attr("r", 5)
        .attr("cx", function(d) {
          return p2x(d.x);
        })
        .attr("cy", function(d) {
          return p2y(d.y);
        })
        .attr("fill", "orange")
        .on("mouseover", function(d){
          p2_tp.transition()
               .duration(200)
               .style("opacity",0.9);
          p2_tp.html("X:" + d.x + "<br/>" + "Y:" + d.y)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d){
          p2_tp.transition()
              .duration(500)
              .style("opacity",0);
        });

  //add x axis
  p2Svg.append("g")
  .attr("class", "p2x axis")
  .attr("transform", "translate(0," + p2Height + ")")
  .call(p2xAxis);

  //add y axis
  p2Svg.append("g")
  .attr("class", "p2y axis")
  .call(p2yAxis);

  //add text Labels
  var p2Xlabel=p2Svg.append("text")
                    .attr("class", "label")
                    .text("X")
                    .attr("x", p2Width-10)
                    .attr("y", p2Height-10);

  var p2Ylabel=p2Svg.append("text")
                    .attr("class", "label")
                    .text("Y")
                    .attr("x", 10)
                    .attr("y", 10)
                    .style("text-anchor","start");
});


//update scatterplot
function updatePartTwo(dataSource){
  d3.csv("/data/" + dataSource, function(error, csvData) {
    if (error) throw error;
    //format the data: string to number
    csvData.forEach(function(d){
      d.x= +d.x;
      d.y= +d.y;
    });
    //scale the range of data
    p2x.domain([d3.min(csvData, function(d){return d.x;})-1,d3.max(csvData, function(d){return d.x;})+1]);
    p2y.domain([0, d3.max(csvData, function(d) {return d.y;})+1]);

    // update chart
    var svg = d3.select("#scatterplots");
    svg.selectAll(".scDots")
        .data(csvData)
        .transition()
        .duration(500)
        .on("start", function(){
          d3.select(this)
          .attr("fill", "steelblue")
          .attr("r", 10);
        })
        .delay(function(d,i){
          return i/csvData.length*500;
        })
        .attr("cx", function(d){return p2x(d["x"]);})
        .attr("cy", function(d){return p2y(d["y"]);})
        .on("end", function(){
          d3.select(this)
            .transition()
            .duration(500)
            .attr("fill", "orange")
            .attr("r", 5);
        });
    //update x axis
    svg.select(".p2x")
      .transition()
      .duration(500)
      .call(p2xAxis);
    //update y axis
    svg.select(".p2y")
        .transition()
        .duration(500)
        .call(p2yAxis);
});
}

//bar charts ////////////////////////////////////////////////////
//set margin and width/height
var barchartMargin={top: 20, right: 20, bottom: 30, left: 40};
var barchartWidth=400-barchartMargin.left-barchartMargin.right;
var barchartHeight=300-barchartMargin.top-barchartMargin.bottom;

//set the ranges
var barX=d3.scaleBand()
            .range([0,barchartWidth])
            .padding(0.3);
var barY=d3.scaleLinear()
            .range([barchartHeight,0]);

//define xy axis
var barxAxis = d3.axisBottom()
              .scale(barX);
var baryAxis = d3.axisLeft()
              .scale(barY);

drawBarChart(csvFile[0], "x", "#xBar");
drawBarChart(csvFile[0], "y", "#yBar");

function drawBarChart(dataSet, attr, divID){
  //append svg to each div
  var svg = d3.select(divID)
                .append("svg")
                .attr("width", barchartWidth + barchartMargin.left + barchartMargin.right)
                .attr("height", barchartHeight + barchartMargin.top + barchartMargin.bottom)
                .append("g")
                .attr("transform", "translate(" + barchartMargin.left + "," + barchartMargin.top + ")");

  d3.csv("/data/"+dataSet, function(error, data){
    if(error) throw error;
    //format data
    data.forEach(function(d){
      d.x = +d.x;
      d.y = +d.y;
    });

    //scale the range of data
    barX.domain(data.map(function(d,i){return i+1;}));
    barY.domain([0, d3.max(data, function(d) {return d[attr];})+1]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "SteelBlue")
        .attr("class", "bar")
        .attr("id", function(d,i){return "bar_"+(i+1);})
        .attr("x", function(d,i){return barX(i+1);})
        .attr("width", barX.bandwidth())
        .attr("y", function(d){return barY(d[attr]);})
        .attr("height", function(d){return barchartHeight-barY(d[attr]);})
        .on("mouseover", function() { d3.selectAll("#"+d3.select(this).attr('id')).style("fill", "red"); })
        .on("mouseout", function() { d3.selectAll("#"+d3.select(this).attr('id')).style("fill", "SteelBlue"); });

  //add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + barchartHeight + ")")
      .call(barxAxis);

  // add the y Axis
  svg.append("g")
      .call(baryAxis);
  });
}



//Mark: Part Three & Four //////////////////////////////////////////////////////////////////
// Put your part three & four code here ***********************

//margin of part three chart
var p3Margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50
};

//width and height of part three chart
var p3Width = 600 - p3Margin.left - p3Margin.right;
var p3Height = 500 - p3Margin.top - p3Margin.bottom;

//set ranges
var p3x = d3.scaleLinear().range([0, p3Width]);
var p3y = d3.scaleLinear().range([p3Height, 0]);

//define xy axis
var p3xAxis = d3.axisBottom()
              .scale(p3x);
var p3yAxis = d3.axisLeft()
              .scale(p3y);

//tooltip
var p3_tp = d3.select("#lineGraphs")
              .append("div")
              .attr("class", "tooltip")
              .style("opacity",0);

//creat line graph
var p3Line = d3.line()
              .x(function(d){ return p3x(d.x); })
              .y(function(d){ return p3y(d.y); });

//append svg to partTwo
var p3Svg = d3.select("#lineGraphs")
              .append("svg")
              .attr("width", p3Width + p3Margin.left + p3Margin.right)
              .attr("height", p3Height + p3Margin.top + p3Margin.bottom)
              .append("g")
              .attr("transform", "translate(" + p3Margin.left + "," + p3Margin.top + ")");

//get data
d3.csv("/data/" + csvFile[0], function(error, csvData) {
  if (error) throw error;

  //format the data: string to number
  csvData.forEach(function(d){
    d.x= +d.x;
    d.y= +d.y;
  });

  //sort x ascending
  csvData.sort(function(a, b){
    return a["x"]-b["x"];
	});

  //scale the range of data
  p3x.domain([d3.min(csvData, function(d){return d.x;})-1,d3.max(csvData, function(d){return d.x;})+1]);
  p3y.domain([0, d3.max(csvData, function(d) {return d.y;})+1]);


  //draw line
  p3Svg.append("path")
     .data([csvData])
     .attr("class", "line")
     .attr("d", p3Line);

  //add the scatterplot
  p3Svg.selectAll("circle")
        .data(csvData)
        .enter()
        .append("circle")
        .attr("class", "lineDots")
        .attr("r", 6)
        .attr("cx", function(d) {
          return p2x(d.x);
        })
        .attr("cy", function(d) {
          return p2y(d.y);
        })
        .attr("fill", "green")
        .on("mouseover", function(){
          d3.select(this).attr("r", 10).style("fill", "red");
        })
        .on("mouseout", function(d){
          d3.select(this).attr("r", 6).style("fill", "green");
        })
        .on("click",function(d){
          d3.select("#lineGraphsLabel")
            .text("X: "+d.x+", "+"Y: "+d.y);
        });

  //add x axis
  p3Svg.append("g")
  .attr("class", "p3x axis")
  .attr("transform", "translate(0," + p3Height + ")")
  .call(p3xAxis);

  //add y axis
  p3Svg.append("g")
  .attr("class", "p3y axis")
  .call(p3yAxis);

  //add text Labels
  var p3Xlabel=p3Svg.append("text")
                    .attr("class", "label")
                    .text("X")
                    .attr("x", p3Width-10)
                    .attr("y", p3Height-10);

  var p3Ylabel=p3Svg.append("text")
                    .attr("class", "label")
                    .text("Y")
                    .attr("x", 10)
                    .attr("y", 10)
                    .style("text-anchor","start");
});



//update part three
function updatePartThree(dataSource){
  d3.csv("/data/" + dataSource, function(error, csvData) {
    if (error) throw error;
    //format the data: string to number
    csvData.forEach(function(d){
      d.x= +d.x;
      d.y= +d.y;
    });

    if(dataSource===csvFile[3]){
      //sort y ascending
      csvData.sort(function(a, b){
        return a["y"]-b["y"];
    	});
    }else{
      //sort x ascending
      csvData.sort(function(a, b){
        return a["x"]-b["x"];
    	});
    }

    //scale the range of data
    p3x.domain([d3.min(csvData, function(d){return d.x;})-1,d3.max(csvData, function(d){return d.x;})+1]);
    p3y.domain([0, d3.max(csvData, function(d) {return d.y;})+1]);

    // update chart
    var svg = d3.select("#lineGraphs");
    svg.selectAll(".lineDots")
        .data(csvData)
        .transition()
        .duration(500)
        .delay(function(d,i){
          return i/csvData.length*500;
        })
        .attr("cx", function(d){return p3x(d["x"]);})
        .attr("cy", function(d){return p3y(d["y"]);});

    //update line
    svg.select(".line")
      .transition()
      .duration(500)
      .attr("d", p3Line(csvData));
    //update x axis
    svg.select(".p3x")
      .transition()
      .duration(500)
      .call(p3xAxis);
    //update y axis
    svg.select(".p3y")
        .transition()
        .duration(500)
        .call(p3yAxis);
    });
}



//Mark: Part Five //////////////////////////////////////////////////////////////////////
// Put your part five code here ***********************
var p5Margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 30
};

//width and height of part two chart
var p5Width = 400 - p5Margin.left - p5Margin.right;
var p5Height = 300 - p5Margin.top - p5Margin.bottom;

//set ranges
var p5x = d3.scaleLinear().range([0, p5Width]);
var p5y = d3.scaleLinear().range([p5Height, 0]);

//define xy axis
var p5xAxis = d3.axisBottom()
              .scale(p5x);
var p5yAxis = d3.axisLeft()
              .scale(p5y);

//draw the scatterplotSet
drawScatterplotSet(csvFile[0], "#scp1");
drawScatterplotSet(csvFile[1], "#scp2");
drawScatterplotSet(csvFile[2], "#scp3");
drawScatterplotSet(csvFile[3], "#scp4");

function drawScatterplotSet(dataset, divID){
  //append svg to each div
  var svg = d3.select(divID)
                .append("svg")
                .attr("width", p5Width + p5Margin.left + p5Margin.right)
                .attr("height", p5Height + p5Margin.top + p5Margin.bottom)
                .append("g")
                .attr("transform", "translate(" + p5Margin.left + "," + p5Margin.top + ")");

  //load data
  d3.csv("/data/" + dataset, function(error, data) {
    if (error) throw error;
    //format the data: string to number
    data.forEach(function(d){
      d.x= +d.x;
      d.y= +d.y;
    });

    //scale the range of data
    p5x.domain([d3.min(data, function(d){return d.x;})-1,d3.max(data, function(d){return d.x;})+1]);
    p5y.domain([0, d3.max(data, function(d) {return d.y;})+1]);

    //regression line
    var rgLine = linearRG(data, "x", "y");

    //add the scatterplot
    svg.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", function(d) {
            return p5x(d.x);
          })
          .attr("cy", function(d) {
            return p5y(d.y);
          })
          .attr("fill", "orange");

    //add regression line
    svg.append("line")
	        .attr("class", "regression")
	        .attr("x1", p5x(rgLine.p1.x))
	        .attr("y1", p5y(rgLine.p1.y))
	        .attr("x2", p5x(rgLine.p2.x))
	        .attr("y2", p5y(rgLine.p2.y))
          .attr("stroke","steelblue")
          .attr("stroke-width", 2);;

    //add x axis
    svg.append("g")
    .attr("class", "p5x axis")
    .attr("transform", "translate(0," + p5Height + ")")
    .call(p5xAxis);

    //add y axis
    svg.append("g")
    .attr("class", "p5y axis")
    .call(p5yAxis);

    //add text Labels
    var p5Xlabel=svg.append("text")
                      .attr("class", "label")
                      .text("X")
                      .attr("x", p5Width-10)
                      .attr("y", p5Height-10);

    var p5Ylabel=svg.append("text")
                      .attr("class", "label")
                      .text("Y")
                      .attr("x", 10)
                      .attr("y", 10)
                      .style("text-anchor","start");
  });

}

// Calculate the linear regression of the dataset: (x1,y1),(x2,y2)
//http://classroom.synonym.com/calculate-trendline-2709.html
function linearRG(data, x, y){
  // get the min and max of x
  var minX = d3.min(data, function(d){return d[x];})-1;
  var maxX = d3.max(data, function(d){return d[x];})+1;
  //get the slope
  var n=data.length;
  var sumXY=0;
  var sumX=0;
  var sumY=0;
  var sumSqX=0;
  //get x,y and x*y
  var pxy=[];
  data.forEach(function(d){
    var obj={};
    obj.x=d[x];
    obj.y=d[y];
    obj.xy=obj.x*obj.y;
    pxy.push(obj);
  });
  //get paramaters for caculating the slope and y-intercept
  pxy.forEach(function(dot){
    sumXY+=dot.xy;
    sumX+=dot.x;
    sumY+=dot.y;
    sumSqX+=dot.x*dot.x;
  });
  //Let a equal n times the summation of all x-values multiplied by their corresponding y-values
  var a=n*sumXY;
  //Let b equal the sum of all x-values times the sum of all y-values
  var b=sumX*sumY;
  //Let c equal n times the sum of all squared x-values
  var c=n*sumSqX;
  //Let d equal the squared sum of all x-values
  var d=sumX*sumX;
  //Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope, m, of the regression line:
  var m=(a-b)/(c-d);

  //Calculating the y-intercept
  //Let e equal the sum of all y-values
  var e=sumY;
  //Let f equal the slope times the sum of all x-values
  var f=m*sumX;
  //Plug the values you have calculated for e and f into the following equation for the y-intercept, k, of the trendline:
  var k=(e-f)/n;

  //return the start and end point of regression line
  return {
    p1:{
      x: minX,
      y: m*minX+k
    },
    p2:{
      x: maxX,
      y: m*maxX+k
    }
  };
}
