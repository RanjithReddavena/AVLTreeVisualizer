const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const tree = new AVLTree();

// Resize canvas to fill screen
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    draw();
}
window.onresize = resize;
resize();

function handleInsert() {
    const input = document.getElementById('nodeValue');
    const val = parseInt(input.value);
    if (!isNaN(val)) {
        tree.root = tree.insert(tree.root, val);
        input.value = ''; 
        draw();
    }
}

function handleClear() {
    tree.root = null;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tree.root) {
        renderNode(tree.root, canvas.width / 2, 80, canvas.width / 4);
    }
}

function renderNode(node, x, y, offset) {
    if (!node) return;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#444";

    // Draw lines to children
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - offset, y + 80);
        ctx.stroke();
        renderNode(node.left, x - offset, y + 80, offset / 2);
    }
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + offset, y + 80);
        ctx.stroke();
        renderNode(node.right, x + offset, y + 80, offset / 2);
    }

    // Draw the node circle
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#007acc";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Node Value
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(node.value, x, y + 5);

    // DISPLAY BALANCE FACTOR
    const bf = tree.getBalanceFactor(node);
    ctx.fillStyle = "#FFCC00"; // Yellow for visibility
    ctx.font = "12px Arial";
    ctx.fillText(`BF: ${bf}`, x, y - 28);
}
