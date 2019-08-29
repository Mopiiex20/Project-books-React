import { AdminActions } from './types'

const prefix = "@@ADMIN";

export default function doAdmin() {
    return {
        type: `${prefix}/${AdminActions.DO_ADMIN}`
    }
};