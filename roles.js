"use strict"

const AccessControl = require("accesscontrol");
const ac = new AccessControl();

ac
    .grant("guest")
    .readAny("post")
    .grant("admin")
    .createAny("post")
    .readAny("post")
    .updateAny("post")
    .deleteAny("post")

module.exports = ac;