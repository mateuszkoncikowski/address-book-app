import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { map, pipe, reduce } from 'ramda';
import axios from 'axios';

const getAddresses = async (key, params, fetchMoreParams) => {
  const page = fetchMoreParams ? fetchMoreParams.page + 1 : 1;
  const { lang, batchSize } = params;
  const { data } = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=${batchSize}&nat=${lang}&seed=sherpany`
  );

  return { users: data.results, page: data.info.page };
};

const useAddresses = (lang, fetchLimit, batchSize) => {
  const [addresses, setAddresses] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { status, data, error, fetchMore } = useInfiniteQuery(
    ['getAddresses', { lang, batchSize }],
    getAddresses,
    {
      getFetchMore: (params) => params,
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      const users = pipe(
        map((group) => group.users),
        reduce((acc, cur) => [...acc, ...cur], [])
      )(data);

      setAddresses(users);
    }
  }, [data]);

  useEffect(() => {
    if (addresses.length >= fetchLimit) {
      setHasMore(false);
    }
  }, [addresses, fetchLimit]);

  return [addresses, fetchMore, hasMore, error, status];
};

export default useAddresses;
