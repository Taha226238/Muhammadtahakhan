let salesData = [250, 300, 150, 400, 350, 200, 500, 450, 400, 600, 700, 800];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#A633FF', '#33FFDA', '#FF8333', '#33FFF1', '#FF5733', '#F1FF33', '#5733FF', '#FF33A6'
];
let tooltip;

function setup() {
    createCanvas(800, 600);
    noLoop();
    tooltip = createDiv('')
        .style('opacity', '0')
        .style('position', 'absolute')
        .style('background', '#fff')
        .style('border', '1px solid #000')
        .style('padding', '5px')
        .style('border-radius', '5px');
}

function draw() {
    background(0);
    drawBarChart(salesData, months);
    drawAxes();
}

function drawBarChart(data, labels) {
    let padding = 50;
    let barWidth = (width - 2 * padding) / data.length;
    let maxData = max(data);

    for (let i = 0; i < data.length; i++) {
        let barHeight = map(data[i], 0, maxData, 0, height - 100);
        let x = padding + i * barWidth;
        let y = height - barHeight - 50;

        // Draw colorful bar
        fill(colors[i]);
        rect(x, y, barWidth - 10, barHeight);

        // Add the label
        fill(255);
        textAlign(CENTER);
        text(labels[i], x + (barWidth - 10) / 2, height - 20);
    }
}

function drawAxes() {
    let padding = 50;
    stroke(255);
    line(padding, height - 50, width - padding, height - 50); // X-axis
    line(padding, height - 50, padding, 50); // Y-axis

    for (let i = 0; i <= 10; i++) {
        let y = map(i, 0, 10, height - 50, 50);
        stroke(150);
        line(padding, y, width - padding, y); // Grid lines
        stroke(255);
        textAlign(RIGHT, CENTER);
        text(i * 100, padding - 10, y);
    }
}

function mouseMoved() {
    clear();
    background(0);
    drawBarChart(salesData, months);
    drawAxes();

    let padding = 50;
    let barWidth = (width - 2 * padding) / salesData.length;
    let maxData = max(salesData);
    let isHovering = false;

    for (let i = 0; i < salesData.length; i++) {
        let x = padding + i * barWidth;
        let barHeight = map(salesData[i], 0, maxData, 0, height - 100);
        let y = height - barHeight - 50;

        if (mouseX > x && mouseX < x + barWidth - 10 && mouseY > y && mouseY < y + barHeight) {
            // Highlight the bar with a lighter color
            fill(lerpColor(color(colors[i]), color(255), 0.5));
            rect(x, y, barWidth - 10, barHeight);

            // Show tooltip
            tooltip.html(`Month: ${months[i]}<br>Sales: ${salesData[i]}`);
            tooltip.position(mouseX + 15, mouseY + 15);
            tooltip.style('opacity', '1');
            isHovering = true;
        } else {
            // Draw the normal bar
            fill(colors[i]);
            rect(x, y, barWidth - 10, barHeight);
        }
    }

    if (!isHovering) {
        tooltip.style('opacity', '0');
    }
}
