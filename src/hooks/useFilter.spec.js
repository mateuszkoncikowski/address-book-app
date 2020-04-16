import useFilter, { filterUser } from './useFilter';

const validUser = {
  name: { first: 'John', last: 'Doe' },
};

const validUser2 = {
  name: { first: 'Jane', last: 'Smith' },
};

const onlyWithLast = {
  name: { last: 'Doe' },
};

const onlyWithName = {
  name: { first: 'Doe' },
};

describe('filterUser', () => {
  it('should work with valid user', () => {
    expect(filterUser('Jo', validUser)).toEqual(true);
    expect(filterUser('oe', validUser)).toEqual(true);
    expect(filterUser('xxx', validUser)).toEqual(false);
    expect(filterUser('Johny', validUser)).toEqual(false);
    expect(filterUser('doei', validUser)).toEqual(false);
  });

  it('should work with missing fields', () => {
    expect(filterUser('o', onlyWithLast)).toEqual(true);
    expect(filterUser('o', onlyWithName)).toEqual(true);
    expect(filterUser('x', onlyWithLast)).toEqual(false);
    expect(filterUser('x', onlyWithName)).toEqual(false);
  });

  it('should return false with falsy values', () => {
    expect(filterUser(undefined, validUser)).toEqual(false);
    expect(filterUser(null, validUser)).toEqual(false);
    expect(filterUser(0, validUser)).toEqual(false);
  });
});

describe('useFilter', () => {
  it('should work with valid user', () => {
    const oneItemList = [validUser];
    const twoItemList = [validUser, validUser2];

    expect(useFilter(oneItemList, '', filterUser)[0]).toEqual(oneItemList);
    expect(useFilter(oneItemList, 'asdasd', filterUser)[0]).toEqual([]);
    expect(useFilter(twoItemList, 'J', filterUser)[0]).toEqual(twoItemList);
    expect(useFilter(twoItemList, 'S', filterUser)[0]).toEqual([validUser2]);
  });
});
