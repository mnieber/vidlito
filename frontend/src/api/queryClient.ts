import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export type ArgsT = {
  queryKey: any;
  invalidate?: boolean;
  update?: (data: any) => any;
};

export const updateQueries = (args: ArgsT) => {
  if (args.update) {
    queryClient.setQueriesData({ queryKey: args.queryKey }, (data: any) =>
      args.update!(data)
    );
  }
  if (args.invalidate) {
    return queryClient.invalidateQueries({ queryKey: args.queryKey });
  } else {
    return Promise.resolve();
  }
};
