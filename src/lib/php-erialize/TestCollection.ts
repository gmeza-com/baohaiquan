import { unserialize } from "php-serialize";

type CollectionItem = unknown;

interface LaravelCollectionSerialized {
  items: CollectionItem[];
  [key: string]: any; // Laravel collections may have additional properties
}

export class TestCollection {
  items: CollectionItem[];

  constructor({ items }: { items: CollectionItem[] }) {
    this.items = items;
  }

  serialize(): string {
    // For compatibility, keeping JSON serialization for internal use
    return JSON.stringify({ items: this.items });
  }

  unserialize(phpSerializedData: string): void {
    try {
      // Use php-serialize to deserialize data from Laravel Collection
      const unserializedData = unserialize(
        phpSerializedData
      ) as LaravelCollectionSerialized;

      // Laravel Collection serialization typically stores items in an 'items' property
      // or sometimes directly as an array or object with numeric keys
      if (unserializedData && typeof unserializedData === "object") {
        if (Array.isArray(unserializedData)) {
          // If the serialized data is directly an array
          this.items = unserializedData;
        } else if (unserializedData.items) {
          // If items are stored in an 'items' property
          if (Array.isArray(unserializedData.items)) {
            this.items = unserializedData.items;
          } else if (typeof unserializedData.items === "object") {
            // Convert object with numeric keys to array
            this.items = Object.values(unserializedData.items);
          } else {
            this.items = [];
          }
        } else {
          // Check if the object has numeric keys (like "0", "1", "2", etc.)
          const keys = Object.keys(unserializedData);
          const isNumericKeys = keys.every((key) => !isNaN(Number(key)));

          if (isNumericKeys && keys.length > 0) {
            // Convert object with numeric keys to array
            this.items = Object.values(unserializedData);
          } else {
            // Try to extract array values from object
            const values = Object.values(unserializedData);
            if (values.length > 0 && Array.isArray(values[0])) {
              this.items = values[0];
            } else {
              console.warn(
                "Unable to extract items from serialized Collection"
              );
              this.items = [];
            }
          }
        }
      } else {
        this.items = [];
      }
    } catch (error) {
      console.error("Error unserializing PHP data:", error);
      this.items = [];
    }
  }

  // Helper method to get all items
  getItems(): CollectionItem[] {
    return this.items;
  }

  // Helper method to add an item
  addItem(item: CollectionItem): void {
    this.items.push(item);
  }

  // Helper method to get item count
  count(): number {
    return this.items.length;
  }
}
