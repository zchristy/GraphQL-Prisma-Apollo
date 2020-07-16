"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Query = {
  // ===========================================================
  // USERS
  users: function users(parent, args, ctx, info) {
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;
    var prisma = ctx.prisma;
    var operationArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      operationArgs.where = {
        OR: [{
          name_contains: query
        }]
      };
    }

    return prisma.query.users(operationArgs, info);
  },
  // ===========================================================
  // POSTS
  posts: function posts(parent, args, ctx, info) {
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;
    var prisma = ctx.prisma;
    var operationArgs = {
      where: {
        published: true
      },
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      operationArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(operationArgs, info);
  },
  // ===========================================================
  // COMMENTS
  comments: function comments(parent, args, ctx, info) {
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;
    var prisma = ctx.prisma;
    var operationArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      operationArgs.where = {
        OR: [{
          text_contains: query
        }, {
          author: {
            name_contains: query
          }
        }]
      };
    }

    return prisma.query.comments(operationArgs, info);
  },
  // ===========================================================
  // ME
  me: function me(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var prisma, request, userId, me;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              _context.next = 4;
              return prisma.query.user({
                where: {
                  id: userId
                }
              }, info);

            case 4:
              me = _context.sent;
              return _context.abrupt("return", me);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // ===========================================================
  // POST
  post: function post(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var prisma, request, userId, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request, false);
              _context2.next = 4;
              return prisma.query.posts({
                where: {
                  id: args.id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 4:
              posts = _context2.sent;

              if (posts.length) {
                _context2.next = 7;
                break;
              }

              throw new Error('Post not found');

            case 7:
              return _context2.abrupt("return", posts[0]);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // ===========================================================
  // MYPOSTS - LOGGED IN USER CAN GET THEIR POSTS
  myPosts: function myPosts(parent, args, ctx, info) {
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;
    var prisma = ctx.prisma,
        request = ctx.request; // Authentication Helper

    var userId = (0, _getUserId["default"])(request);
    var operationArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      operationArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(operationArgs, info);
  }
};
exports.Query = Query;