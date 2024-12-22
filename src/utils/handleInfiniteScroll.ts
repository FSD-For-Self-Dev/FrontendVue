export const bottomMargin = 400;

export async function handleScroll(loadDataFunction: Function) {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolledFromTop = window.scrollY;
  if (scrollableHeight - scrolledFromTop < bottomMargin) {
    loadDataFunction();
  }
}

export async function handleElementScroll(
  element: HTMLElement,
  loadDataFunction: Function,
  elementBottomMargin: number = 24,
) {
  const { scrollTop, clientHeight, scrollHeight } = element;
  if (scrollTop > 0 && scrollTop + clientHeight + elementBottomMargin >= scrollHeight) {
    loadDataFunction();
  }
}
