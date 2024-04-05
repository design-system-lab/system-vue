export type Phase = 'before-enter' | 'enter' | 'after-enter' | 'before-leave' | 'leave' | 'after-leave';

/**
 * Transition functions applied in this order:
 *  1. Before Leave
 *  2. Leave
 *  3. Before Enter
 *  4. Enter
 *  5. After Leave
 *  6. After Enter
 */

/**
 * 
 * @param {Phase} phase - Should be string type of Phase
 * @param {HTMLElement} el - The element returned by the transition function 
 */

export function slideInOutContent(phase: Phase, el: HTMLElement) {
  function onBeforeEnter() {
    // called before it's entered dom
    el.classList.add('slide-in-out-content--before-enter');
  }

  function onEnter() {
    // called one frame after entering
    el.style.marginTop = `-${el.offsetHeight}px`;
    requestAnimationFrame(() => {
      el.classList.add('slide-in-out-content--enter');
      el.style.marginTop = '0';
    });
  }

  function onAfterEnter() {
    // called when enter transition has finished
    el.style.marginTop = '';
    el.classList.remove('slide-in-out-content--before-enter', 'slide-in-out-content--enter');
  }

  function onBeforeLeave() {
    // called before the leave hook
    el.classList.add('slide-in-out-content--before-leave');
  }

  function onLeave() {
    // called one frame after leave begins
    el.style.marginTop = `-${el.offsetHeight}px`;
    el.classList.add('slide-in-out-content--leave');
  }

  function onAfterLeave() {
    // called when the leave transition has finished
    el.style.marginTop = '';
    el.classList.remove('slide-in-out-content--before-leave', 'slide-in-out-content--leave');
  }

  switch(phase) {
    case 'before-enter':
      onBeforeEnter();
      break;
    case 'enter':
      onEnter();
      break;
    case 'after-enter':
      onAfterEnter();
      break;
    case 'before-leave':
      onBeforeLeave();
      break;
    case 'leave':
      onLeave();
      break;
    case 'after-leave':
      onAfterLeave();
      break;
    default:
      break;
  }
}

/**
 * swapContent
 * 
 * @param {Phase} phase - Should be string type of Phase
 * @param {HTMLElement} el - The element returned by the transition function 
 * @param {HTMLElement} parent - The parent node of the items being transitioned 
 */

export function swapContent(phase: Phase, el: HTMLElement, parent?: HTMLElement | null) {
  function onBeforeEnter() {
    // called before it's entered dom
    el.classList.add('swap-content--before-enter');
  }

  function onEnter() {
    // called one frame after entering
    el.classList.add('swap-content--enter');
    if (parent) {
      parent.style.height = `${el.offsetHeight}px`;
    }
  }

  function onAfterEnter() {
    // called when enter transition has finished
    el.classList.remove('swap-content--before-enter', 'swap-content--enter');
    if (parent) {
      parent.style.transition = '';
      parent.style.height = '';
    }
  }

  function onBeforeLeave() {
    // called before the leave hook
    if (parent) {
      parent.style.height = `${parent?.offsetHeight}px`;
      parent.style.overflow = 'hidden';
    }
    el.classList.add('swap-content--before-leave');
  }

  function onLeave() {
    // called one frame after leave begins
    if (parent) {
      parent.style.transition = 'height 0.35s ease-in-out';
    }
    el.classList.add('swap-content--leave');
  }

  function onAfterLeave() {
    // called when the leave transition has finished
    el.classList.remove('swap-content--before-leave', 'swap-content--leave');
  }

  switch(phase) {
    case 'before-enter':
      onBeforeEnter();
      break;
    case 'enter':
      onEnter();
      break;
    case 'after-enter':
      onAfterEnter();
      break;
    case 'before-leave':
      onBeforeLeave();
      break;
    case 'leave':
      onLeave();
      break;
    case 'after-leave':
      onAfterLeave();
      break;
    default:
      break;
  }
}
