module.exports = class {
    constructor(list) {
        this.list = list

        this.set()
    }

    set(prev = null, next = null) {
        this.index = {
            prev, next
        }

        return this
    }

    fix(old, node) {
        if (this.index.prev === old) {
            this.index.prev = node
        }

        if (this.index.next === old) {
            this.index.next = node
        }
    }

    prev(count = 0) {
        if (this.index === null) {
            this.set(this.list.last)
        }

        if (this.index.prev === null) {
            this.set(this.list.last)
        }

        let items = this.list.get(this.index.prev, true, count).reverse()

        if (items.length < count) {
            items = this.list.get(this.list.first, false, count)
        }

        const prev = items[0].prev
        const next = items[items.length - 1].next

        this.set(
            prev !== null ? prev : this.list.first,
            next !== null ? next : this.list.last
        )

        return items
    }

    next(count = 0) {
        if (this.list.empty() === true) {
            return []
        }

        if (this.index.next === null) {
            this.set(null, this.list.last)
        }

        let items = this.list.get(this.index.next, false, count)

        if (items.length < count) {
            items = this.list.get(this.list.last, true, count).reverse()
        }

        const next = items[items.length - 1].next
        const prev = items[0].prev

        this.set(
            prev !== null ? prev : this.first,
            next !== null ? next : null
        )

        return items
    }

    last(count = 0) {
        if (this.list.empty() === true) {
            return []
        }

        return this.list.get(this.list.last, true, count).reverse()
    }
}
