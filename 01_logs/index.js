const {format} = require("date-fns");
const {v4: uuid} = require("uuid");

console.log(format(new Date(), 'yyyy/MM/dd\tHH:mm:ss'))
console.log(uuid())

// "nodemon": "^3.1.9"  => "majorVersion.minorVersion.patch"
// ^ => allow an update to 'minorVersion'and 'patch' but do not update 'majorVersion'
// ~ => allow and update to patch' but do not update any other version
// "*" => alway use latest version which is not too safe
//  to install specific version => npm i nodemon@3.1.9
