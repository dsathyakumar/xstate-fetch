import { assign } from "xstate";

export const actions = {
  startAction: assign((ctx, evt) => {
    return {
      phase: "start"
    };
  }),
  progressAction: assign((ctx, evt) => {
    return {
      phase: "progress"
    };
  }),
  errorAction: assign((ctx, evt) => {
    return {
      phase: "error"
    };
  }),
  timeoutAction: assign((ctx, evt) => {
    return {
      phase: "timeout"
    };
  }),
  successAction: assign((ctx, evt, meta) => {
    console.log("successAction");
    console.log(meta);
    return {
      phase: "success",
      currentCount: ctx.currentCount + 1,
      resultsCount: ctx.resultsCount + (meta.state.event.payload || 0)
    };
  }),
  triggerAction: assign((ctx, evt) => {
    return {
      phase: "trigger"
    };
  }),
  retryAction: assign((ctx, evt, meta) => {
    console.log("retryaction");
    return {
      phase: "retrying...",
      currentCount: ctx.currentCount + 1,
      resultsCount: ctx.resultsCount + (meta.state.event.payload || 0)
    };
  })
};
