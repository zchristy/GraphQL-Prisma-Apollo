"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _demoUserData = require("./seeds/demoUserData");

var _demoPostData = require("./seeds/demoPostData");

var _demoCommentData = require("./seeds/demoCommentData");

// Demo User Data
// Demo Post Data
// Demo Comment Data
var db = {
  users: _demoUserData.users,
  posts: _demoPostData.posts,
  comments: _demoCommentData.comments
};
exports.db = db;