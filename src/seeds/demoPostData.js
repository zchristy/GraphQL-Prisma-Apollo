const posts = [
  {
    id: '1',
    title: 'Star wars',
    body: 'Watch it, its out on Disney',
    published: true,
    author: '1',
    comments: [1],
  },
  {
    id: '2',
    title: 'Baseball',
    body: 'Best sport ever invented',
    published: true,
    author: '1',
    comments: [2],
  },
  {
    id: '3',
    title: 'GraphQL',
    body: 'Pretty bad ass in my opinion',
    published: false,
    author: '3',
    comments: [3, 4],
  },
]

module.exports = { posts }
