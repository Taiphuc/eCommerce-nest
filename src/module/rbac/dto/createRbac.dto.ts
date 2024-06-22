import { RoleGrant } from "src/database/models/role.model";

export class CreateRbacDto {
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly grants?: Array<RoleGrant>
}