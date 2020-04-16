import * as R from 'ramda';

import { always, ifElse, identity, filter } from 'ramda';

export const filterUser = (filter, user) => {
  const {
    name: { first, last },
  } = user;
  const loweredFilter = filter ? filter.toLowerCase() : null;

  return (
    (!!first && first.toLowerCase().includes(loweredFilter)) ||
    (!!last && last.toLowerCase().includes(loweredFilter))
  );
};

export const useFilter = (items, filterValue, fn) => {
  const filterFn = ifElse(
    always(R.isEmpty(filterValue)),
    identity,
    filter((item) => fn(filterValue, item))
  );
  return [filterFn(items)];
};

export default useFilter;
