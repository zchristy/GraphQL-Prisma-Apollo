"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = void 0;

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Subscription = {
  comment: {
    subscribe: function subscribe(parent, args, ctx, info) {
      var prisma = ctx.prisma;
      return prisma.subscription.comment(null, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, ctx, info) {
      var prisma = ctx.prisma;
      return prisma.subscription.post(null, info);
    }
  },
  myPost: {
    subscribe: function subscribe(parent, args, ctx, info) {
      var prisma = ctx.prisma,
          request = ctx.request;
      var userId = (0, _getUserId["default"])(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info);
    }
  }
};
exports.Subscription = Subscription;