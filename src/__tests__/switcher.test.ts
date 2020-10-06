import switchr from '../index';

describe('Switchr', () => {
  test('can init with object options', () => {
    const map = switchr({
      1: 'test',
    });
    expect(map).toBeDefined();
    expect(map).toHaveProperty('get');
  });

  test('can get simple values', () => {
    const map = switchr({
      1: 1,
      two: 'two',
    });
    expect(map.get(1)).toBe(1);
    expect(map.get('two')).toBe('two');
  });

  test('can get function values', () => {
    const map = switchr({
      1: () => 1,
      '2': (a: number): number => a * 10,
      three(a: number, b: number): number {
        return a + b;
      },
    });
    expect(map.get(1)).toBe(1);
    expect(map.get('2', 10)).toBe(100);
    expect(map.get('three', 10, 5)).toBe(15);
  });

  test('can get default value', () => {
    const map = switchr({
      default: 'one',
    });
    expect(map.get('default')).toBe('one');
    expect(map.get('nokey')).toBe('one');
  });

  test('will return null if no default value', () => {
    const map = switchr({});
    expect(map.get('two')).toBeNull();
  });

  test('can set new values', () => {
    const map = switchr({});
    expect(map.list().length).toBe(0);
    map.set('newKey', 'newValue');
    map.set('newFuncKey', (a: number, b: number, c: number): number => a * b * c);
    expect(map.list().length).toBe(2);
    expect(map.get('newKey')).toBe('newValue');
    expect(map.get('newFuncKey', 2, 3, 4)).toBe(24);
  });

  test('can override keys', () => {
    const map = switchr({
      one: 'first value',
      default: 'default value',
    });
    expect(map.list().length).toBe(2);
    expect(map.get('one')).toBe('first value');
    expect(map.get('default')).toBe('default value');
    map.set('one', 'second value');
    map.set('default', (a: number, b: number, c: number): number => a * b * c);
    expect(map.list().length).toBe(2);
    expect(map.get('one')).toBe('second value');
    expect(map.get('default', 2, 3, 4)).toBe(24);
    expect(map.get('missingKey', 2, 3, 4)).toBe(24);
  });

  test('can get keys list', () => {
    const map = switchr({
      one: 'first value',
      two: 'second value',
    });

    const list = map.list();
    expect(list.length).toBe(2);
    expect(list).toContain('one');
    expect(list).toContain('two');
  });

  test('can determine if has key', () => {
    const map = switchr({
      one: 'one',
    });

    expect(map.has('one')).toBeTruthy();
    expect(map.has('three')).toBeFalsy();
  });

  test('can\'t init with both key and keys on one case', () => {
    try {
      const map = switchr([
        {
          key: 'one',
          keys: ['one2'],
          value: 1
        }
      ]);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.SWITCHR_KEY_ERROR).toBeDefined();
    }
  });

  test('can init with collapsing key values using array options', () => {
    const map = switchr([
      {
        keys: ['one', 'one2', 'one3'],
        value: 1,
      },
      {
        keys: [1, 2],
        value: { a: 'a', b: 'b' },
      },
      {
        keys: ['two', 'three', 'four'],
        value: (a: number, b: number): number => a * b,
      },
    ]);

    expect(map.get('one')).toBe(1);
    expect(map.get('one2')).toBe(1);
    expect(map.get('one3')).toBe(1);
    expect(map.get(1)).toBe(map.get(2));
    expect(map.get('two', 4, 5)).toBe(20);
    expect(map.get('three', 4, 5)).toBe(20);
    expect(map.get('four', 5, 5)).toBe(25);
  });

  test('works with array options', () => {
    const map = switchr([
      {
        key: 1,
        value: 'test',
      },
      {
        key: 2,
        value: (a: number): number => a + 10,
      },
    ]);
    expect(map).toBeDefined();
    expect(map).toHaveProperty('get');
    expect(map).toHaveProperty('set');
    expect(map).toHaveProperty('list');
    expect(map).toHaveProperty('has');
    expect(map.get(1)).toBe('test');
    expect(map.get(2, 10)).toBe(20);
    map.set(1, 'new val');
    expect(map.get(1)).toBe('new val');
    expect(map.list().length).toBe(2);
    expect(map.has(1)).toBeTruthy();
    expect(map.get('nokey')).toBe(null);
    map.set('default', (a: string): string => `new ${a}`);
    expect(map.list().length).toBe(3);
    expect(map.get('nokey', 'test')).toBe('new test');
  });
});
