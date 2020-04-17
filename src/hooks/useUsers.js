import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { map, pipe, reduce } from 'ramda';
import axios from 'axios';

const calculatePage = (startIndex, batchSize) =>
  startIndex ? Math.floor(startIndex / batchSize) + 1 : 1;

const getUsers = async (key, params, fetchMoreParams) => {
  const startIndex = fetchMoreParams ? fetchMoreParams.startIndex : null;
  const { lang, batchSize } = params;
  const page = calculatePage(startIndex, batchSize);

  const { data } = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=${batchSize}&nat=${lang}&seed=sherpany`
  );

  return { users: data.results };
};

const useUsers = (lang, fetchLimit, batchSize) => {
  const [users, setUsers] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { data, fetchMore } = useInfiniteQuery(
    ['getUsers', { lang, batchSize }],
    getUsers,
    {
      getFetchMore: (lastPage) => {
        return lastPage;
      },
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      const users = pipe(
        map((group) => group.users),
        reduce((acc, cur) => [...acc, ...cur], [])
      )(data);

      setUsers(users);
      setHasNextPage(users.length < fetchLimit);
    }
  }, [data, fetchLimit]);

  return [users, fetchMore, hasNextPage];
};

export default useUsers;