// Resize box based on input dimensions
function resizeBox() {
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const boxContainer = document.getElementById("box-container");

    // Validate input
    if (width < 100 || height < 100) {
        alert("Width and height must be at least 100px.");
        return;
    }

    boxContainer.style.width = `${width}px`;
    boxContainer.style.height = `${height}px`;
}

// Change pen size
function setPenSize(size) {
    const textBox = document.getElementById("text-box");
    if (size === 'thick') {
        textBox.style.fontSize = '24px';
    } else if (size === 'medium') {
        textBox.style.fontSize = '16px';
    } else if (size === 'thin') {
        textBox.style.fontSize = '12px';
    }
}

// Download the content as an image
function downloadImage() {
    const textBox = document.getElementById("text-box");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Get box dimensions
    const width = document.getElementById("box-container").offsetWidth;
    const height = document.getElementById("box-container").offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // Set canvas background
    ctx.fillStyle = "#ffffff"; // Background color
    ctx.fillRect(0, 0, width, height);

    // Set text properties
    ctx.fillStyle = "#000000"; // Text color
    const fontSize = window.getComputedStyle(textBox).fontSize;
    const fontFamily = window.getComputedStyle(textBox).fontFamily;
    ctx.font = `${fontSize} ${fontFamily}`;
    const lineHeight = parseInt(fontSize) * 1.2;

    // Split text into lines
    const lines = textBox.value.split("\n");
    let y = lineHeight;

    lines.forEach(line => {
        ctx.fillText(line, 10, y);
        y += lineHeight;
    });

    // Create a downloadable image link
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "text-box-content.png";
    link.click();
}
