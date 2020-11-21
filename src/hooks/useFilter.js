import { always, ifElse, identity, filter, isEmpty } from 'ramda';

export const filterUser = (filter, user) => {
  const {
    name: { first, last },
  } = user;

  if (filter) {
    return `${first ? first : ''} ${last ? last : ''}`
      .toLowerCase()
      .includes(filter.toLowerCase());
  }
  return false;
};

export const useFilter = (items, filterValue, fn) => {
  const filterFn = ifElse(
    always(isEmpty(filterValue)),
    identity,
    filter((item) => fn(filterValue, item))
  );
  return filterFn(items);
};

export default useFilter;
