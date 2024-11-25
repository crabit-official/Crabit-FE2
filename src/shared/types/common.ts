import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type ResponseError = AxiosError<{
  code: string;
  isSuccess: boolean;
  message: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<UseMutationOptions<TData, ResponseError, TVariables, unknown>, 'mutationFn'>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>, 'queryKey'>;

export type { ResponseError, UseMutationCustomOptions, UseQueryCustomOptions };
