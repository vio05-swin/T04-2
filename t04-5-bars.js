// T04-6: Scaling charts

const createBarChart = (data) => {

    // SVG internal coordinate system
    const viewW = 500;
    const viewH = 1600;

    // SVG displayed size on the webpage
    const displayW = 640;
    const displayH = 420;

    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", displayW)
        .attr("height", displayH)
        .style("border", "1px solid black");

    // X scale: numeric values
    const xMax = d3.max(data, d => d.count);

    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW]);

    // Y scale: brand categories
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // Draw the bars
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

};