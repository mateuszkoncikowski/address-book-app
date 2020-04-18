import useFilter, { filterUser } from './useFilter';

const validUser_1 = {
  name: { first: 'John', last: 'Doe' },
};

const validUser_2 = {
  name: { first: 'Jane', last: 'Smith' },
};

const validUser_3 = {
  name: { first: 'Mark', last: 'Doe' },
};

const onlyWithLast = {
  name: { last: 'Doe' },
};

const onlyWithName = {
  name: { first: 'John' },
};

describe('filterUser', () => {
  it('should work with valid user', () => {
    expect(filterUser('Jo', validUser_1)).toEqual(true);
    expect(filterUser('oe', validUser_1)).toEqual(true);
    expect(filterUser('John Doe', validUser_1)).toEqual(true);
    expect(filterUser('xxx', validUser_1)).toEqual(false);
    expect(filterUser('Johny', validUser_1)).toEqual(false);
    expect(filterUser('doei', validUser_1)).toEqual(false);
  });

  it('should work with missing fields', () => {
    expect(filterUser('o', onlyWithLast)).toEqual(true);
    expect(filterUser('h', onlyWithName)).toEqual(true);
    expect(filterUser('x', onlyWithLast)).toEqual(false);
    expect(filterUser('x', onlyWithName)).toEqual(false);
  });

  it('should return false with falsy values', () => {
    expect(filterUser(undefined, validUser_1)).toEqual(false);
    expect(filterUser(null, validUser_1)).toEqual(false);
    expect(filterUser(0, validUser_1)).toEqual(false);
  });
});

describe('useFilter', () => {
  it('should work with valid user', () => {
    const oneItemList = [validUser_1];
    const twoItemList = [validUser_1, validUser_2, validUser_3];

    expect(useFilter(oneItemList, '', filterUser)).toEqual(oneItemList);
    expect(useFilter(oneItemList, 'invalid', filterUser)).toEqual([]);
    expect(useFilter(twoItemList, 'John', filterUser)).toEqual([validUser_1]);
    expect(useFilter(twoItemList, 'Mark', filterUser)).toEqual([validUser_3]);
    expect(useFilter(twoItemList, 'Doe', filterUser)).toEqual([
      validUser_1,
      validUser_3,
    ]);
    expect(useFilter(twoItemList, 'John Doe', filterUser)).toEqual([
      validUser_1,
    ]);
    expect(useFilter(twoItemList, 'Smith', filterUser)).toEqual([validUser_2]);
  });
});
