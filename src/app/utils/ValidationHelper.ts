import 'reflect-metadata';

export class ValidationHelper {
    static isOptionalField(target: any, fieldName: string): boolean {
        // Get the prototype of the target
        const prototype = target.prototype || Object.getPrototypeOf(target);


        // Retrieve metadata
        const metadata = Reflect.getMetadata('optional', prototype, fieldName);

        // Return true if metadata indicates the field is optional
        return metadata === true;
    }
}
