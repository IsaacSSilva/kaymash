export class KeySet {
  private keys = new Set<string>();

  add(key: string) {
    this.keys.add(key);
  }

  remove(key: string) {
    this.keys.delete(key);
  }

  has(key: string): boolean {
    return this.keys.has(key);
  }

  clear() {
    this.keys.clear();
  }

  getKeys(): Set<string> {
    return this.keys;
  }
}
