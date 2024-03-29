module.exports = {
  networks: {
    CLIdevelopment: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    dashboard: {},
    loc_development_development: {
      network_id: "*",
      port: 8545,
      host: "127.0.0.1"
    }
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  }
};
