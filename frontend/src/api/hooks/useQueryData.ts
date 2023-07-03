import { runInAction } from 'mobx';
import React from 'react';
import { QueryData } from '/src/api/QueryData';
import { flags } from '/src/app/flags';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export type OptionsT = {
  fetchAsLoad?: boolean;
  debugLabel?: string;
  processQueryData?: (queryData: ObjT, prevQueryData?: ObjT) => ObjT;
};

export const useQueryData = (query: ObjT, options?: OptionsT) => {
  const fetchAsLoad = options?.fetchAsLoad;
  const debugLabel = options?.debugLabel;
  const processQueryData = options?.processQueryData;

  const queryData = useBuilder(() => {
    const queryData = new QueryData();
    queryData.debugLabel = debugLabel;
    updateQueryData(queryData, query, fetchAsLoad, processQueryData);
    return queryData;
  });

  React.useEffect(() => {
    runInAction(() => {
      updateQueryData(queryData, query, fetchAsLoad, processQueryData);
      if (debugLabel && flags.logQueries) {
        queryData.log(
          `QueryData ${queryData.id} (${debugLabel}) updated to ${queryData.status}`
        );
      }
    });
  }, [query]);

  return queryData;
};

function updateQueryData(
  queryData: QueryData,
  query: ObjT,
  fetchAsLoad: boolean | undefined,
  processQueryData?: (queryData: ObjT, prevQueryData?: ObjT) => ObjT
) {
  queryData.query = query;
  queryData.data = processQueryData
    ? processQueryData(query.data, queryData.data)
    : query.data;
  queryData.status = fetchAsLoad && query.isFetching ? 'loading' : query.status;
}
