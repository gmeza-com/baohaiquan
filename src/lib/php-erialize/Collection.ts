interface CollectionItem {
  link: string;
  content: string;
}

export class Collection {
  items: CollectionItem[];

  constructor({ items }: { items: CollectionItem[] }) {
    this.items = items;
  }
  serialize() {
    return JSON.stringify({ items: this.items });
  }
  unserialize(rawData: string) {
    const { items } = JSON.parse(rawData);
    this.items = items;
  }
}
