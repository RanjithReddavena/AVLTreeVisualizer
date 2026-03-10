class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() { this.root = null; }

    getHeight(node) { return node ? node.height : 0; }
    
    getBalanceFactor(node) { 
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0; 
    }

    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    insert(node, value) {
        if (!node) return new Node(value);

        // ALLOW DUPLICATES: If value is <= node.value, it goes left (or right)
        // Here we put duplicates in the RIGHT subtree
        if (value < node.value) {
            node.left = this.insert(node.left, value);
        } else {
            node.right = this.insert(node.right, value);
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalanceFactor(node);

        // Balancing Logic
        if (balance > 1 && value < node.left.value) return this.rightRotate(node);
        if (balance < -1 && value >= node.right.value) return this.leftRotate(node);
        if (balance > 1 && value >= node.left.value) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }
}
