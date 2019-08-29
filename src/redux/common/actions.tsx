import { ErrorActions, ErrorCatch } from "./types";

const prefix = "@@ERROR";

export default function onErrorOccured(data: ErrorCatch) {
  return {
    type: `${prefix}/${ErrorActions.ERROR_SHOW}`,
    data
  };
}