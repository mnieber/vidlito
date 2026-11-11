import { z } from 'zod';

// The endpoints of allauth, relative to the host url of the restClient
export const authUrl = '/_allauth/browser/v1/auth';

// The response of allauth when a user is signed in
export const SessionSchema = z.object({
  data: z.object({
    user: z.object({
      id: z.string(),
      email: z.string(),
    }),
  }),
});

const ErrorsSchema = z.object({
  errors: z.array(
    z.object({
      code: z.string(),
      message: z.string(),
      param: z.string().optional(),
    })
  ),
});

const FlowsSchema = z.object({
  data: z.object({
    flows: z.array(
      z.object({
        id: z.string(),
        is_pending: z.boolean().optional(),
      })
    ),
  }),
});

export type AllauthFieldErrorsT = Record<string, string>;

// Returns the errors in the body of a failed response.
export const parseAllauthErrors = (responseData: unknown) => {
  const parsed = ErrorsSchema.safeParse(responseData);
  return parsed.success ? parsed.data.errors : [];
};

// Returns the message of each field (the `param` of the error). An error without a
// field is stored under `global`.
export const getAllauthFieldErrors = (
  responseData: unknown
): AllauthFieldErrorsT => {
  const fieldErrors: AllauthFieldErrorsT = {};
  parseAllauthErrors(responseData).forEach((x) => {
    fieldErrors[x.param ?? 'global'] ??= x.message;
  });
  return fieldErrors;
};

// Whether a 401 response says that the user must still complete this step.
export const hasPendingFlow = (responseData: unknown, flowId: string) => {
  const parsed = FlowsSchema.safeParse(responseData);
  return (
    parsed.success &&
    parsed.data.data.flows.some((x) => x.id === flowId && x.is_pending)
  );
};
