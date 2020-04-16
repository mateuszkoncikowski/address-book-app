import * as R from 'ramda';

import { always, ifElse, identity, filter } from 'ramda';

export const useFilter = (items, filterValue, fn) => {
  const filterFn = ifElse(
    always(R.isEmpty(filterValue)),
    identity,
    filter((item) => fn(filterValue, item))
  );
  return [filterFn(items)];
};

export default useFilter;
