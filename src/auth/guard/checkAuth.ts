import { Injectable } from "@nestjs/common"
import { Header } from "src/enum/enum"
import { ApikeyService } from "src/module/apikey/apikey.service"

@Injectable()
export class checkAuth {
    constructor(private readonly apikeyService: ApikeyService) { }

    async apiKey(req, res, next): Promise<any> {
        try {
            const key = req.headers[Header.API_KEY]?.toString()
            if (!key) {
                return res.status(403).json({
                    message: "Forbidden error"
                })
            }

            // check objectKey
            const objKey = await this.apikeyService.findById(key)
            if (!objKey) {
                return res.status(403).json({
                    message: "Forbidden error"
                })
            }
            req.objKey = objKey

            return next()
        } catch (error) {

        }
    }

    async permission(permission) {
        return (req, res, next) => {
            if (!req.objKey.permissions) {
                return res.status(403).json({
                    message: "Permission denied"
                })
            }

            // console.log("permission: ", req.objKey.permissions);
            const validPermission = req.objKey.permissions.includes(permission)
            if (!validPermission) {
                return res.status(403).json({
                    message: "Permission denied"
                })
            }

            return next()
        }
    }
}
