/* eslint-disable no-restricted-globals */
self.onmessage = (e: MessageEvent<string>) => {
  if (e.data === 'start') {
    const start = performance.now();
    let counter = 0;

    setInterval(() => {
      //console.log(performance.now() - start);
      counter++;
      //console.log(counter);
      if (counter % 33 === 0) {
        self.postMessage(counter);
      }
    }, 1000);
  }
};

export {};
