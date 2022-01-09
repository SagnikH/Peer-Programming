function Node(item = null, next = null) {
    this.item = item;
    this.next = next;
}

class Queue {
    #head; #tail; #size;

    constructor() {
        this.#head = new Node();    // dummy node
        this.#tail = head;
        this.#size = 0;
    }

    size() { return this.#size; }

    isEmpty() { return this.#size == 0; }

    enqueue(item) {
        this.#tail.next = new Node(item);
        this.#tail = this.#tail.next;
        this.#size++;
    }

    dequeue() {
        if (this.#size == 0) return null;
        const item = this.#head.next.item;
        this.#head.next = this.#head.next.next;
        this.#size--;
        return item;
    }
}

module.exports = { Queue };