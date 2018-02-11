INFO-4602-5602 Project 1 - Wei Miao

I put all the JavaScript code into the external js file, please refer to the index.js

Accomplished Part:

1. Part one: Interpreting Data - Load CSV files and check if all the files are loaded correctly.

2. Part two: Scatterplot with datasource switching; Bar charts of X and Y value from "anscombe_I.csv".

3. Part Three&Four: Line Graphs with interaction.

4. part Five: Scatterplot sets of four CSV data file.


Accomplished Bells & Whistles:

1. Bell: Tooltips - In Part two scatterplot, when hovering over a point, a tooltip will show up with its X and Y value.

2. Bell: Xs and Ys - In Part two, there are two bar charts showing the X and Y value from "anscombe_I.csv".

3. Bell: Styling your Visualization - I applied the Bootsrap framework for page styling, and for each visualization, I added a grid texture as the background, which makes the charts looks like the hand drawing style.

4. Bell: Best Fit Lines - In Part five, added the best fit line for each scatterplot.

5. Whistle: Transitions - In Part two, the scatterplot allows switching datasets from a dropdown list, and there is a animated transition when updating the points.

6.Whistle: Coordinated Views - In Part two, when hovering over a bar, it will be highlighted with red color, and also the bar in the corresponding graph.

7. Whistle: Replication - Please refer to the images in "Replication" directory. I replicated all the graphs with Tableau. I found drawing the scatterplots with Tableau is pretty straightforward. But when I drawing the bar chart of the X and Y value respectively, there is no index of each row in the CSV data, I don't know how to add the index dimension in Tableau, so I tried to use X and Y as the column dimension, however, the Y value is float number, which leads the bar chart looks weird. My final solution is adding the index attribute in the CSV file manually. As there are only 11 rows, it is very easy to add, but this is definitely not an appropriate approach for data in large size. While drawing these graphs by programming with D3.js, it is more flexible to define the X and Y axis, and to generate the same chart for different CSV data, we just need to change the parameter of the predefined function, but in Tableau, we have to repeat the steps for every dataset.
