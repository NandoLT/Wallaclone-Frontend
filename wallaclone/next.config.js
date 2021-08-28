module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_BASE_URL_DEPLOYED: process.env.REACT_APP_API_BASE_URL_DEPLOYED,
    REACT_APP_BASE_URL_IMAGES_DIRECTORY: process.env.REACT_APP_BASE_URL_IMAGES_DIRECTORY
  }, images: {
    domains: ['https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com'],
  },
}
