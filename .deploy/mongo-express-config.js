module.exports = {
  mongodb: {
    url: process.env.ME_CONFIG_MONGODB_URL || `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@mongodb:27017/`,
    adminUsername: process.env.MONGO_ROOT_USERNAME,
    adminPassword: process.env.MONGO_ROOT_PASSWORD,
    authSource: 'admin',
    authMechanism: 'DEFAULT'
  },
  site: {
    baseUrl: '/',
    port: 8081,
    host: '0.0.0.0'
  },
  useBasicAuth: true,
  basicAuth: {
    username: process.env.MONGO_EXPRESS_USERNAME || 'admin',
    password: process.env.MONGO_EXPRESS_PASSWORD || 'pass'
  },
  options: {
    gridFSEnabled: true,
    admin: true
  }
}; 