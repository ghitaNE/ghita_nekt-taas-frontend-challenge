export default {
  redirectToGitHub() {
    window.location.href = `${import.meta.env.VITE_OAUTH_BASE_URL}?client_id=${
      import.meta.env.VITE_OAUTH_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_OAUTH_REDIRECT_URI}&scope=user%20repo`
  }
}
