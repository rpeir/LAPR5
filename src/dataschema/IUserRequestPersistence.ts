export interface IUserRequestPersistence {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber:string,
    email: string;
    password: string;
    salt: string;
}
