class FrameList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return newNode;
    }

    // Ajuster pour get next nodes
    getNextNode(currentNode) {
        currentNode = currentNode.next;
        return currentNode;
    }

    getPrevNode(currentNode) {
        currentNode = currentNode.prev;
        return currentNode;
    }

    getFirstNode() {
        return this.head;
    }

    getLastNode() {
        return this.tail;
    }
}