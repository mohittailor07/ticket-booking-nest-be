export class User {
  constructor(
    public _id: string,
    public mobileNumber: number,
    public email: string,
    public password: string,
    public fullName: string,
    public role: string,
  ) {}
}
