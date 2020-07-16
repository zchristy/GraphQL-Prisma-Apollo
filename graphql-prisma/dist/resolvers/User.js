"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, ctx, info) {
      var request = ctx.request;
      var userId = (0, _getUserId["default"])(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, ctx, info) {
      var prisma = ctx.prisma;
      var operationArgs = {
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      };
      return prisma.query.posts(operationArgs, info);
    }
  }
};
exports.User = User;