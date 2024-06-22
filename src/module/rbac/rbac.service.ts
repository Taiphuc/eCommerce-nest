import { Inject, Injectable, Scope } from "@nestjs/common";
import { Model } from "mongoose";
import { RESOURCE_MODEL, ROLE_MODEL } from "src/database/database.constants";
import { Resource } from "src/database/models/resource.model";
import { CreateRbacDto } from "./dto/createRbac.dto";
import { Role } from "src/database/models/role.model";
import { ListRbacDto } from "./dto/listRbac.dto";

@Injectable({ scope: Scope.REQUEST })
export class RbacService {
    constructor(
        @Inject(RESOURCE_MODEL) private resourceModel: Model<Resource>,
        @Inject(ROLE_MODEL) private roleModel: Model<Role>
    ) { }

    async createResource({ name, slug, description }: CreateRbacDto): Promise<Resource> {
        try {
            // 1. check name and slug exists
            const isExist = await this.resourceModel.findOne({ $or: [{ src_name: name }, { src_slug: slug }] })
            if (isExist) {
                throw new Error('Name or slug already exits')
            }

            // 2. new resource
            const resource = await this.resourceModel.create({
                src_name: name,
                src_slug: slug,
                src_description: description
            })

            return resource
        } catch (err) {

        }
    }

    async listResource({ userId, limit, offset, search }: ListRbacDto): Promise<Resource[]> {
        try {
            // 1. check admin

            // 2. get list of resource
            const resources = await this.resourceModel.aggregate([
                {
                    $project: {
                        _id: 0,
                        name: '$src_name',
                        slug: '$src_slug',
                        description: '$src_description',
                        resourceId: '$_id',
                        createdAt: 1
                    }
                }
            ])

            return resources
        } catch (err) {

        }
    }

    async createRole({ name, slug, description, grants }: CreateRbacDto): Promise<Role> {
        try {
            // 1. check role exists
            const isExist = await this.roleModel.findOne({ role_name: name })
            if (isExist) {
                throw new Error('Role already exits')
            }

            // 2. new role
            const role = await this.roleModel.create({
                role_name: name,
                role_slug: slug,
                role_description: description,
                role_grants: grants
            })

            return role
        } catch (err) {

        }
    }

    async listRole({ userId, limit, offset, search }: ListRbacDto): Promise<Role[]> {
        try {
            const roles = await this.roleModel.aggregate([
                {
                    $unwind: '$role_grants'
                },
                {
                    // lookup like join in sql
                    $lookup: {
                        from: 'Resources',
                        localField: 'role_grants.resource',
                        foreignField: '_id',
                        as: 'resource'
                    }
                },
                {
                    $unwind: '$resource'
                },
                {
                    $project: {
                        role: '$role_name',
                        resource: '$resource.src_name',
                        action: '$role_grants.actions',
                        attributes: '$role_grants.attributes'
                    }
                },
                {
                    $unwind: '$action'
                },
                {
                    $project: {
                        _id: 0,
                        role: 1,
                        resource: 1,
                        action: '$action',
                        attributes: 1
                    }
                }
            ])

            return roles
        } catch (err) {

        }
    }
}