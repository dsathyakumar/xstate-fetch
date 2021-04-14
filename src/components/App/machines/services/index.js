const fetchService = (ctx, evt) => (callback) => {
  console.log("invoking uploaderService");
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://jsonplaceholder.typicode.com/comments", true);

  xhr.onloadstart = (evt) => {
    console.log("start");
    callback("START");
  };
  xhr.onerror = (evt) => {
    console.log("error");
    callback("ERROR");
  };
  xhr.ontimeout = (evt) => {
    console.log("timeout");
    callback("TIMEOUT");
  };
  xhr.onprogress = (evt) => {
    console.log("progress");
    callback("PROGRESS");
  };
  xhr.onload = (evt) => {
    console.log("success");
    const data = evt.target.responseText;
    console.log(evt.target.status);
    // console.log(data);
    callback({
      type: "SUCCESS",
      payload: data.length,
      status: evt.target.status
    });
  };

  xhr.send();
};

export const services = {
  fetchService
};
