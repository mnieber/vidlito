import { runInAction } from 'mobx';
import React from 'react';
import { QueryData } from '/src/api/QueryData';
import { flags } from '/src/app/flags';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export type OptionsT = {
  fetchAsLoad?: boolean;
  debugLabel?: string;
};

export const useQueryData = (query: ObjT, options?: OptionsT) => {
  const fetchAsLoad = options?.fetchAsLoad;
  const debugLabel = options?.debugLabel;

  const queryData = useBuilder(() => {
    const queryData = new QueryData();
    queryData.debugLabel = debugLabel;
    updateQueryData(queryData, query, fetchAsLoad);
    return queryData;
  });

  React.useEffect(() => {
    runInAction(() => {
      updateQueryData(queryData, query, fetchAsLoad);
      if (debugLabel && flags.logQueries) {
        queryData.log(
          `QueryData ${queryData.id} (${debugLabel}) updated to ${queryData.status}`
        );
      }
    });
  }, [query, queryData, fetchAsLoad, debugLabel]);

  return queryData;
};

function updateQueryData(
  queryData: QueryData,
  query: ObjT,
  fetchAsLoad: boolean | undefined
) {
  queryData.query = query;
  queryData.data = query.data;
  queryData.status = fetchAsLoad && query.isFetching ? 'loading' : query.status;
}
