const DAO = require('../models/models');

module.exports = {
  Api: {
    getblock: async (req, res) => {
      let result = await DAO.getRead();
      console.log(result);
    },
  },
};
