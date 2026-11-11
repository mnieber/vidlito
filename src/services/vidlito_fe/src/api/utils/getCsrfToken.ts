// Django sets this cookie (e.g. when the session is loaded), and checks the
// X-CSRFToken header on each write.
export const getCsrfToken = () => {
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
};
