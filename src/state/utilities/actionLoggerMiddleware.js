import { addMiddleware } from "mobx-state-tree"
import { nanoid } from "nanoid"
import { now } from "../../utilities/dates"

global.actionHistory = global.actionHistory || []

global.actionHistory.findByUid = (uid) => {
  return global.actionHistory.find((action) => {
    return action.uid === uid
  })
}

export const actionLoggerMiddleware = (target) => {
  addMiddleware(target, (call, next) => {
    const actionData = {
      name: call.name,
      args: call.args,
      uid: nanoid(8),
      time: now.time,
    }

    global.actionHistory.push(actionData)
    console.log(`${target.name} middleware: ${actionData.name}`, actionData)
    next(call)
  })
}
