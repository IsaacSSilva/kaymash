export class KeySet {
    keys = new Set();
    add(key) {
        this.keys.add(key);
    }
    remove(key) {
        this.keys.delete(key);
    }
    has(key) {
        return this.keys.has(key);
    }
    clear() {
        this.keys.clear();
    }
    getKeys() {
        return this.keys;
    }
}
