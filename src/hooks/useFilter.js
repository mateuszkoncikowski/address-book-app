import { always, ifElse, identity, filter, isEmpty } from 'ramda';

/**
 *
 * User filter function we want to apply to returned user list
 *
 * @param filter
 * @param user
 * @returns {boolean}
 */
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

/**
 *
 * Filtering hook we can apply to a given list with supplied filtering function
 *
 * @param items
 * @param filterValue
 * @param fn
 * @returns {(function(*=): (*))|any}
 */

export const useFilter = (items, filterValue, fn) => {
  const filterFn = ifElse(
    always(isEmpty(filterValue)),
    identity,
    filter((item) => fn(filterValue, item))
  );
  return filterFn(items);
};

export default useFilter;
