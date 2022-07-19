const Paginator = require('./paginator')

/**
 * Is THIS how you do a doubly linked list?
 */
module.exports = class {
    constructor() {
        this.paginator = new Paginator(this)

        this.clear()
    }

    push(data) {
        const node = this.node(data)

        if (this.empty() === true) {
            this.first = node
        } else {
            node.prev = this.last
            node.prev.next = node
        }

        this.last = node

        this.count++

        return this
    }

    node(data) {
        return {
            data,
            prev: null,
            next: null,
        }
    }

    reset() {
        this.index = this.last

        return this
    }

    shift() {
        if (this.empty() === false) {
            const node = this.first

            if (this.count === 1) {
                this.clear()
            } else {
                this.first = node.next
                this.first.prev = null

                this.count--
            }

            this.paginator.fix(node, this.first)

            return node
        }
    }

    pop() {
        if (this.empty() === false) {
            const node = this.last

            if (this.count === 1) {
                this.clear()
            } else {
                this.last = node.prev
                this.last.next = null

                this.count--
            }

            this.paginator.fix(node, this.last)

            return node
        }
    }

    empty() {
        return this.count === 0
    }

    clear() {
        this.first = null
        this.last = null
        this.index = null
        this.count = 0

        this.paginator.set()
    }

    get(start = null, reverse = false, limit = null) {
        const data = []

        let node = start === null ? this[reverse === false ? 'first' : 'last'] : start
        let count = 0

        while (node !== null && (limit === null || count < limit)) {
            data.push(node)

            node = node[reverse === false ? 'next' : 'prev']

            count++
        }

        return data
    }
}
