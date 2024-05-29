import { Injectable } from "@nestjs/common"
import * as _ from "lodash"

@Injectable()
export class Utils {
    getInfoData = ({ fields = [], object = {} }) => {
        return _.pick(object, fields)
    }
}