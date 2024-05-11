<h1 align=center>About</h1>
<p align=center>Course scheduling is one of many forms of Constraint Satisfying Problems (CSP). In this assignment, we are tasked to solve it using methods learned in our Intelligent Systems' course</p>
<p align=center>In this solution, the greedy search algorithm is used with the evaluation function of child nodes being</p>

$$f(node) = h_0 + h_1 + h_2 + h_3$$

<p align=center>where</p>

$$h_0=\frac{3\times maxweight-weight}{3\times maxweight}$$

$$h_1=\frac{2\times quota_{VENUE} - quota_{COURSE}}{2\times quota_{VENUE}}$$

$$h_2=\frac{3\times N_{slots|day|total}- N_{slots|day|available}}{3\times N_{slots|day|total}}$$

$$h_3=\frac{N_{slots|week|total}-N_{slots|week|available}}{N_{slots|week|total}}$$

<p align=center>in tree traversal, without backtracking, with the following shape</p>

<table align=center>
  <tr><th>Dimension</th><th>Feature</th></tr>
  <tr><td>Depth</td><td>Courses</td></tr>
  <tr><td>Branches</td><td>Possible combination of $venue$ and $available\_timeslots_{teacher \cap venue}$</td></tr>
</table>

<table align=center>
  <tr><th>Item</th><th>Relevance</th></tr>
  <tr><td><a href=notebook.ipynb>notebook.ipynb</a></td><td>The solution file</td></tr>
  <tr><td>Web-app</td><td>A simple schedule web-app <a href=https://csp-scheduling.deno.dev>(see/try app)</a> making use of the IS model's output<br />Source code in <a href=main.ts>main.ts</a> and <a href=/app_assets>/app_assets</a></tr>
</table>

<p align=center>
  <a href=https://csp-scheduling.deno.dev><img src=repo_assets/mobileView.gif></a>
</p>
