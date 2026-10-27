// T04-6: Scaling charts

//const createBarChart = (data) => {

    // SVG internal coordinate system
    //const viewW = 500;
    //const viewH = 1600;

    // SVG displayed size on the webpage
    //const displayW = 640;
    //const displayH = 420;

    //const svg = d3.select(".responsive-svg-container")
       // .append("svg")
       // .attr("viewBox", `0 0 ${viewW} ${viewH}`)
       // .attr("width", displayW)
       // .attr("height", displayH)
       // .style("border", "1px solid black");

    // X scale: numeric values
    //const xMax = d3.max(data, d => d.count);

    //const xScale = d3.scaleLinear()
      //  .domain([0, xMax])
        //.range([0, viewW]);

    // Y scale: brand categories
    //const yScale = d3.scaleBand()
      //  .domain(data.map(d => d.brand))
        //.range([0, viewH])
        //.paddingInner(0.2)
       // .paddingOuter(0.1);

    // Draw the bars
    //svg.selectAll("rect")
      //  .data(data)
      //  .join("rect")
      //  .attr("class", d => `bar bar-${d.count}`)
      //  .attr("x", 0)
      //  .attr("y", d => yScale(d.brand))
      //  .attr("width", d => xScale(d.count))
      //  .attr("height", yScale.bandwidth())
       // .attr("fill", "steelblue");

//};



const createBarChart = (data) => {

    // --- Sizes (logical vs. display) ---
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);

    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);

    // --- SVG root ---
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", displayW)
        .attr("height", displayH)
        .style("border", "1px solid #ccc");

    // --- Scales ---
    const xMax = d3.max(data, d => d.count);

    // Leave room for the category labels and values
    const labelX = 100;

    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW - labelX - 35]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // --- T04-7: Group each bar and its labels ---
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // --- Bar rectangle ---
    barAndLabel
        .append("rect")
        .attr("x", labelX)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    // --- Category label ---
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelX)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");

    // --- Value label ---
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => labelX + xScale(d.count) + 4)
        .attr("y", yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");

};
