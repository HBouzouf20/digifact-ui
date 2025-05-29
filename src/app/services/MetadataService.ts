import "reflect-metadata";

export class MetadataService {
    /**
     * Retrieves metadata for fields in a given class.
     * @param cls The class to extract metadata from.
     * @returns An array of objects containing field names and their optionality.
     */
    getFieldMetadata(cls: Function): { key: string; optional: boolean }[] {
        return Object.getOwnPropertyNames(cls.prototype).reduce((metadata, key) => {
            const optional = Reflect.getMetadata("optional", cls.prototype, key) || false;
            metadata.push({ key, optional });
            return metadata;
        }, [] as { key: string; optional: boolean }[]);
    }
}
