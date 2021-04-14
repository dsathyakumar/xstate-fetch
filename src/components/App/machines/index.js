import { Machine } from "xstate";
import { services } from "./services";
import { actions } from "./actions";
import { guards } from "./guards";

const xhrMachine = Machine(
  {
    id: "xhrmachine",
    initial: "idle",
    context: {
      maxReTries: 2,
      currentCount: 0,
      phase: "idle",
      resultsCount: 0
    },
    states: {
      idle: {
        type: "atomic",
        on: {
          TRIGGER: {
            target: "trigger",
            actions: ["triggerAction"]
          }
        }
      },
      trigger: {
        type: "atomic",
        invoke: {
          id: "uploaderService",
          src: "fetchService"
        },
        on: {
          START: {
            actions: ["startAction"]
          },
          PROGRESS: {
            actions: ["progressAction"]
          },
          ERROR: {
            actions: ["errorAction"],
            target: "error"
          },
          TIMEOUT: {
            actions: ["timeoutAction"],
            target: "error"
          },
          SUCCESS: {
            target: "success"
          }
        }
      },
      success: {
        on: {
          "": [
            {
              actions: ["retryAction"],
              target: "trigger",
              cond: "shouldRetry"
            },
            {
              actions: ["successAction"],
              target: "done",
              cond: "is200"
            }
          ]
        }
      },
      error: {
        type: "final"
      },
      done: {
        type: "final"
      }
    }
  },
  {
    guards: {
      ...guards
    },
    actions: {
      ...actions
    },
    services: {
      // triggerUpload: (ctx, evt) => async (callback) => {
      ...services
    }
  }
);

//extend an existing machine with new props
export const createMachine = (props) => {
  const extendedXhrMachine = xhrMachine.withContext({
    ...xhrMachine.context,
    ...props
  });
  return extendedXhrMachine;
};
