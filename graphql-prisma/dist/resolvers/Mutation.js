"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

var _generateToken = _interopRequireDefault(require("../utils/generateToken"));

var _hashPassword = _interopRequireDefault(require("../utils/hashPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Mutation = {
  // ===========================================================
  // USER - LOGIN
  login: function login(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var prisma, user, isMatch;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              prisma = ctx.prisma;
              _context.next = 3;
              return prisma.query.user({
                where: {
                  email: args.data.email
                }
              });

            case 3:
              user = _context.sent;

              if (user) {
                _context.next = 6;
                break;
              }

              throw new Error('Unable to login');

            case 6:
              _context.next = 8;
              return _bcryptjs["default"].compare(args.data.password, user.password);

            case 8:
              isMatch = _context.sent;

              if (isMatch) {
                _context.next = 11;
                break;
              }

              throw new Error('Unable to login');

            case 11:
              return _context.abrupt("return", {
                user: user,
                token: (0, _generateToken["default"])(user.id)
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // ===========================================================
  // USER - CREATE
  createUser: function createUser(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var prisma, password, emailTaken, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              prisma = ctx.prisma;
              _context2.next = 3;
              return (0, _hashPassword["default"])(args.data.password);

            case 3:
              password = _context2.sent;
              _context2.next = 6;
              return prisma.exists.User({
                email: args.data.email
              });

            case 6:
              emailTaken = _context2.sent;

              if (!emailTaken) {
                _context2.next = 9;
                break;
              }

              throw new Error('Email is taken.');

            case 9:
              _context2.next = 11;
              return prisma.mutation.createUser({
                data: Object.assign({}, args.data, {
                  password: password
                })
              });

            case 11:
              user = _context2.sent;
              return _context2.abrupt("return", {
                user: user,
                token: (0, _generateToken["default"])(user.id)
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // ===========================================================
  // USER - UPDATE
  updateUser: function updateUser(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var prisma, request, userId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request); // update and hash updated password.

              if (!(typeof args.data.password === 'string')) {
                _context3.next = 6;
                break;
              }

              _context3.next = 5;
              return (0, _hashPassword["default"])(args.data.password);

            case 5:
              args.data.password = _context3.sent;

            case 6:
              return _context3.abrupt("return", prisma.mutation.updateUser({
                where: {
                  id: userId
                },
                data: args.data
              }, info));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  // ===========================================================
  // USER - DELETE
  deleteUser: function deleteUser(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var prisma, request, userId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              return _context4.abrupt("return", prisma.mutation.deleteUser({
                where: {
                  id: userId
                }
              }, info));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // ===========================================================
  // POST - CREATE
  createPost: function createPost(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var prisma, request, userId;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              return _context5.abrupt("return", prisma.mutation.createPost({
                data: Object.assign({}, args.data, {
                  author: {
                    connect: {
                      id: userId
                    }
                  }
                })
              }, info));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  // ===========================================================
  // POST - DELETE
  deletePost: function deletePost(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var prisma, request, userId, postExists;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              _context6.next = 4;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              postExists = _context6.sent;

              if (postExists) {
                _context6.next = 7;
                break;
              }

              throw new Error('Unable to delete post');

            case 7:
              return _context6.abrupt("return", prisma.mutation.deletePost({
                where: {
                  id: args.id
                }
              }, info));

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  // ===========================================================
  // POST - UPDATE
  updatePost: function updatePost(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var prisma, request, userId, postExists, isPublished;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              _context7.next = 4;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              postExists = _context7.sent;
              _context7.next = 7;
              return prisma.exists.Post({
                id: args.id,
                published: true
              });

            case 7:
              isPublished = _context7.sent;

              if (postExists) {
                _context7.next = 10;
                break;
              }

              throw new Error('Unable to update post');

            case 10:
              if (!(isPublished && args.data.published === false)) {
                _context7.next = 13;
                break;
              }

              _context7.next = 13;
              return prisma.mutation.deleteManyComments({
                where: {
                  post: {
                    id: args.id
                  }
                }
              });

            case 13:
              return _context7.abrupt("return", prisma.mutation.updatePost({
                where: {
                  id: args.id
                },
                data: args.data
              }, info));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  // ===========================================================
  // COMMENT - CREATE
  createComment: function createComment(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      var prisma, request, userId, postExists;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request); // does post exist?

              _context8.next = 4;
              return prisma.exists.Post({
                id: args.data.post,
                published: true
              });

            case 4:
              postExists = _context8.sent;

              if (postExists) {
                _context8.next = 7;
                break;
              }

              throw new Error('Post Not Found');

            case 7:
              return _context8.abrupt("return", prisma.mutation.createComment({
                data: Object.assign({}, args.data, {
                  author: {
                    connect: {
                      id: userId
                    }
                  },
                  post: {
                    connect: {
                      id: args.data.post
                    }
                  }
                })
              }, info));

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  // ===========================================================
  // COMMENT - DELETE
  deleteComment: function deleteComment(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      var prisma, request, userId, commentExists;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              _context9.next = 4;
              return prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              commentExists = _context9.sent;

              if (commentExists) {
                _context9.next = 7;
                break;
              }

              throw new Error('Unable to delete Comment');

            case 7:
              return _context9.abrupt("return", prisma.mutation.deleteComment({
                where: {
                  id: args.id
                }
              }, info));

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  // ===========================================================
  // COMMENT - UPDATE
  updateComment: function updateComment(parent, args, ctx, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var prisma, request, userId, commentExists;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              prisma = ctx.prisma, request = ctx.request; // Authentication helper function

              userId = (0, _getUserId["default"])(request);
              _context10.next = 4;
              return prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              commentExists = _context10.sent;

              if (commentExists) {
                _context10.next = 7;
                break;
              }

              throw new Error('Unable to update Comment');

            case 7:
              return _context10.abrupt("return", prisma.mutation.updateComment({
                where: {
                  id: args.id
                },
                data: args.data
              }, info));

            case 8:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  }
};
exports.Mutation = Mutation;