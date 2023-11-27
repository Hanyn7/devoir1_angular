import { Role } from "./Role.model";

export class User {
  user_id!: number;
  username!: string;
  password!: string;
  email!:string;
  roles!: Role[];
}