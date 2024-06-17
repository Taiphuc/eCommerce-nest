import { Injectable } from "@nestjs/common"
import * as _ from "lodash"
import { Types } from "mongoose"

@Injectable()
export class Utils {
    getInfoData = ({ fields = [], object = {} }) => {
        return _.pick(object, fields)
    }

    // ['a', 'b'] => {a:1, b:1}
    getSelectData = (select = []) => {
        return Object.fromEntries(select.map(el => [el, 1]))
    }

    unGetSelectData = (select = []) => {
        return Object.fromEntries(select.map(el => [el, 0]))
    }

    convertToObjectIdMongo = (id: string) => new Types.ObjectId(id)
}