import { getButtonElement } from './buttons';

describe('button functions', () => {
  test('getButtonElement returns correct type based on input', () => {
    const buttonEl = getButtonElement(undefined, undefined);
    expect(buttonEl).toBe('button');
    const anchorEl = getButtonElement('www.example.com', undefined);
    expect(anchorEl).toBe('a');
    const routerEl = getButtonElement(undefined, { name: 'Home' });
    expect(routerEl).toBe('router-link');
  });
});