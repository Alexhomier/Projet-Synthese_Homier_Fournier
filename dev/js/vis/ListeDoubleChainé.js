class Node {
    constructor(value) {
        this.value = value;
        this.last = null;
        this.next = null;
    }
}

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
    }

    // Ajuster pour get next nodes
    getNextNode(currentNode) {
        if (index >= this.length || index < 0) {
            return false;
        }
        let currentIndex = 0;
        let currentNode = this.head;
        while (currentIndex != index) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        return currentNode;
    }
}