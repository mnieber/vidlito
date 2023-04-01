import { runInAction } from 'mobx';
import React from 'react';
import { QueryData } from 'src/api/QueryData';
import { ObjT } from 'src/utils/types';

export type OptionsT = {
  fetchAsLoad?: boolean;
  debugLabel?: string;
};

export const useQueryData = (query: ObjT, options?: OptionsT) => {
  const [queryData] = React.useState(() => new QueryData());
  const fetchAsLoad = options?.fetchAsLoad;
  const debugLabel = options?.debugLabel;

  React.useEffect(() => {
    runInAction(() => {
      queryData.query = debugLabel ? query : query;
      queryData.data = query.data;
      queryData.status =
        fetchAsLoad && query.isFetching ? 'loading' : query.status;
    });
  }, [query, queryData, fetchAsLoad, debugLabel]);

  return queryData;
};
