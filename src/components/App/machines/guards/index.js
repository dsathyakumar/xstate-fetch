export const guards = {
  is200: (ctx, evt, meta) => {
    console.log("is200");
    return meta.state.event.status === 200;
  },
  shouldRetry: (ctx, evt, meta) => {
    let retry = false;
    if (ctx.maxReTries > ctx.currentCount) {
      retry = true;
    }
    console.log(`retry = ${retry}`);
    return retry;
  }
};
