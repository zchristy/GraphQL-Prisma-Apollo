"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentReplacements = exports.resolvers = void 0;

var _prismaBinding = require("prisma-binding");

var _Query = require("./Query");

var _Mutation = require("./Mutation");

var _User = require("./User");

var _Post = require("./Post");

var _Comment = require("./Comment");

var _Subscription = require("./Subscription");

var resolvers = {
  Query: _Query.Query,
  Mutation: _Mutation.Mutation,
  Subscription: _Subscription.Subscription,
  Post: _Post.Post,
  User: _User.User,
  Comment: _Comment.Comment
};
exports.resolvers = resolvers;
var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);
exports.fragmentReplacements = fragmentReplacements;