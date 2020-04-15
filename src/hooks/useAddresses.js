import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { map, pipe, reduce } from 'ramda';
import axios from 'axios';

const getAddresses = async (key, params, fetchMoreParams) => {
  const page = fetchMoreParams ? fetchMoreParams.page + 1 : 1;
  const { lang } = params;
  const { data } = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=25&nat=${lang}&seed=sherpany`
  );

  return { users: data.results, page: data.info.page };
};

const useAddresses = (lang) => {
  const [addresses, setAddresses] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { status, data, error, fetchMore } = useInfiniteQuery(
    ['getAddresses', { lang: lang }],
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
    if (addresses.length >= 100) {
      setHasMore(false);
    }
  }, [addresses]);

  return [addresses, fetchMore, hasMore, error, status];
};

export default useAddresses;
