const util = require('util');

var reqData = function (req) {
  const params = ['method', 'hostname', 'path', 'query', 'headers', 'body'];
  return params.reduce(
    // eslint-disable-next-line security/detect-object-injection
    (accumulator, currentValue) => { accumulator[currentValue] = req[currentValue]; return accumulator; },
    {}
  );
};

const inspect = object => {
  return util.inspect(object, false, null, true);
};

module.exports = {
  reqData,
  inspect
};
