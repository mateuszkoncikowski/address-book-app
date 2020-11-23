import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { map, pipe, reduce, join } from 'ramda';
import axios from 'axios';

const calculatePage = (startIndex, batchSize) =>
  startIndex ? Math.floor(startIndex / batchSize) + 1 : 1;

const config = { headers: { 'Access-Control-Allow-Origin': '*' } };

const getUsers = async (key, params, fetchMoreParams) => {
  const startIndex = fetchMoreParams ? fetchMoreParams.startIndex : null;
  const { nationalities, batchSize } = params;
  const nationalitiesParam = join(',', nationalities);

  const page = calculatePage(startIndex, batchSize);
  const { data } = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=${batchSize}&nat=${nationalitiesParam}&seed=sherpany`,
    config
  );

  return { users: data.results };
};

/**
 *
 * Hook responsible for fetching users
 *
 * @param nationalities - list of user nationalities we want to fetch
 * @param fetchLimit - maximum number we want to fetch via this hook
 * @param batchSize - how many items we want to fetch per batch
 * @returns {[*[], *, *]}
 */

const useUsers = (nationalities, fetchLimit, batchSize) => {
  const [users, setUsers] = useState([]);
  const { data, fetchMore, isFetching, isFetchingMore } = useInfiniteQuery(
    ['getUsers', { nationalities, batchSize }],
    getUsers,
    {
      getFetchMore: (lastPage) => {
        return lastPage;
      },
      refetchOnWindowFocus: false,
    }
  );

  const isLoading = isFetching || isFetchingMore;

  useEffect(() => {
    if (data.length > 0) {
      const users = pipe(
        map((group) => group.users),
        reduce((acc, cur) => [...acc, ...cur], [])
      )(data);

      setUsers(users.slice(0, fetchLimit));
    }
  }, [data, fetchLimit]);

  return [users, fetchMore, isLoading];
};

export default useUsers;
