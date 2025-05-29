import "reflect-metadata";


export class Client {
    id?: number;

    fullname!: string;
    address?: string;
    phone!: string;
    @Reflect.metadata('optional', true)
    email?: string;
    type ? : string;
}
