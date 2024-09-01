import { authRoutes } from '/src/auth/routes';
import { RouterLink } from '/src/routes/components';

export const useMessages = () => {
  const divIAgreeToTheTerms = (
    <label htmlFor={'acceptsTerms'}>
      I agree to the{' '}
      <RouterLink key="termsAndConditions" to={authRoutes.termsAndConditions}>
        Terms and Conditions
      </RouterLink>
    </label>
  );

  return {
    messages: {
      divIAgreeToTheTerms,
      divPleaseEnterYourEmailAddress: 'Please enter your email address',
      divYouNeedToAcceptTheTermsAndConditions:
        'You need to accept the terms and conditions',
      divSorryThereSeemsToBeATechnicalProblem:
        'Sorry, there seems to be a technical problem. ' +
        'Check your internet connection, or try again later.',
    },
  };
};
