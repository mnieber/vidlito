import { runInAction } from 'mobx';
import React from 'react';
import { QueryData } from 'src/api/QueryData';
import { flags } from 'src/app/flags';
import { ObjT } from 'src/utils/types';

export type OptionsT = {
  fetchAsLoad?: boolean;
  debugLabel?: string;
};

export const useQueryData = (query: ObjT, options?: OptionsT) => {
  const fetchAsLoad = options?.fetchAsLoad;
  const debugLabel = options?.debugLabel;

  const [queryData] = React.useState(() => {
    const queryData = new QueryData();
    queryData.debugLabel = debugLabel;
    return queryData;
  });

  React.useEffect(() => {
    runInAction(() => {
      queryData.query = query;
      queryData.data = query.data;
      queryData.status =
        fetchAsLoad && query.isFetching ? 'loading' : query.status;
      if (queryData.debugLabel && flags.logQueries) {
        queryData.log(
          `QueryData ${queryData.id} (${queryData.debugLabel}) updated`
        );
      }
    });
  }, [query, queryData, fetchAsLoad]);

  return queryData;
};
