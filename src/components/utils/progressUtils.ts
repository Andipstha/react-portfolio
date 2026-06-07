export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      // Continue crawling slowly toward 99% — never fully stops so users
      // don't see a frozen bar while the 3D model is still being loaded.
      interval = setInterval(() => {
        if (percent < 99 && Math.random() > 0.3) {
          percent = percent + 1;
          setLoading(percent);
        }
      }, 600);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }

  function destroy() {
    console.log("progressUtils: destroying progress interval timer...");
    clearInterval(interval);
  }

  return { loaded, percent, clear, destroy };
};
