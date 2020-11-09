class Queue {

    /**
     * Constructor.
     */
    constructor(maxLength) {
        this.maxLength = maxLength;
        this.items = [];
    }

    /**
     * Get the size of the queue.
     */
    size() {
        return this.items.length;
    }

    /**
     * Whether the queue is empty.
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * Whether the queue is not empty.
     */
    isNotEmpty() {
        return !this.isEmpty();
    }

    /**
     * Enqueue an item. Return true if added, false if not.
     */
    enqueue(item) {
        if (this.size() === this.maxLength) return false;
        return this.items.push(item) > 0;
    }

    /**
     * Dequeue the upcoming item and return it.
     */
    dequeue() {
        return this.items.shift();
    }

}

export default Queue;
