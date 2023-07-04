import { runInAction } from 'mobx';
import React from 'react';
import { IQuery, ObservableQuery, QueryDataT } from '/src/api/ObservableQuery';
import { flags } from '/src/app/flags';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export interface TanstackQuery extends IQuery {
  isFetching: boolean;
}

export type OptionsT = {
  fetchAsLoad?: boolean;
  debugLabel?: string;
  processQueryData?: (
    queryData: QueryDataT,
    prevQueryData?: QueryDataT
  ) => QueryDataT;
};

export const useObservableQuery = (
  query: TanstackQuery,
  options?: OptionsT
) => {
  const fetchAsLoad = options?.fetchAsLoad;
  const debugLabel = options?.debugLabel;
  const processQueryData = options?.processQueryData;

  const observableQuery = useBuilder(() => {
    const observableQuery = new ObservableQuery();
    observableQuery.debugLabel = debugLabel;
    updateObservableQuery(
      observableQuery,
      query,
      fetchAsLoad,
      processQueryData
    );
    return observableQuery;
  });

  React.useEffect(() => {
    runInAction(() => {
      updateObservableQuery(
        observableQuery,
        query,
        fetchAsLoad,
        processQueryData
      );
      if (debugLabel && flags.logQueries) {
        observableQuery.log(
          `ObservableQuery ${observableQuery.id} (${debugLabel}) updated to ${observableQuery.status}`
        );
      }
    });
  }, [query]);

  return observableQuery;
};

function updateObservableQuery(
  observableQuery: ObservableQuery,
  tanstackQuery: TanstackQuery,
  fetchAsLoad: boolean | undefined,
  processQueryData?: (
    queryData: QueryDataT,
    prevQueryData?: QueryDataT
  ) => QueryDataT
) {
  observableQuery.data = processQueryData
    ? processQueryData(tanstackQuery.data, observableQuery.data)
    : tanstackQuery.data;
  observableQuery.status =
    fetchAsLoad && tanstackQuery.isFetching ? 'loading' : tanstackQuery.status;
}
