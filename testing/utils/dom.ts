export const checkClasses = (el: HTMLElement, arr: string[]) => {
  const classes = el.classList;
  let passes = true;

  for (let i = 0; i < arr.length; i += 1) {
    if (!classes.contains(arr[i])) {
      console.error(`Class '${arr[i]}' does not exist on element`);
      passes = false;
      break;
    }
  }

  return passes;
}