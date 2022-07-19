const { Type } = require('@jedmud/tui-elements')
const List = require('./list')
const defaultOptions = require('../options.json')

module.exports = class extends Type {
    construct() {
        this.raw = new List()
        this.rows = new List()
        this.queue = []

        this.mergeOptions(defaultOptions)
    }

    ready() {
        const items = this.raw.get()
        const l = items.length

        this.rows.clear()

        for (let i = 0; i < l; i++) {
            this.set(items[i].data, false)
        }

        this.last()
    }

    set(row, raw = true) {
        const wrapped = this.wrap(row)

        for (let i = 0, l = wrapped.length; i < l; i++) {
            this.rows.push(wrapped[i])
        }

        if (raw === true) {
            this.raw.push(row)
        }

        this.limit(this.raw)
        this.limit(this.rows)

        return this
    }

    limit(list) {
        const l = list.count - this.options.buffer

        for (let i = 0; i < l; i++) {
            list.shift()
        }
    }

    write() {
        if (this.queue.length !== 0) {
            this.print(this.normalize(this.queue))
        }

        this.queue = []
    }

    normalize(items) {
        const rows = []
        const l = items.length

        for (let i = 0; i < l; i++) {
            rows.push(items[i].data)
        }

        return rows
    }

    prev() {
        this.queue = this.rows.paginator.prev(this.config.params.height)

        return this
    }

    next() {
        this.queue = this.rows.paginator.next(this.config.params.height)

        return this
    }

    last() {
        if (this.rows.paginator.index.next === null) {
            this.queue = this.rows.paginator.last(this.config.params.height)
        }

        return this
    }

    release() {
        this.rows.paginator.set()

        return this
    }
}
