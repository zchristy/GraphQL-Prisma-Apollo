import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

// =========== GET USERS ================
const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`

client.query({
  query: getUsers
}).then(res => {
  let html = ''

  res.data.users.forEach(user => {
    html += `
      <div>
        <h3>${user.name}</h3>
      </div>
    `
  })

  document.querySelector('#users').innerHTML = html
})

// =========== GET POSTS ================
const getPosts = gql`
  query {
    posts {
      id
      title
      author {
        id
        name
      }
    }
  }
`

client.query({
  query: getPosts
}).then(res => {
  let html = ''

  res.data.posts.forEach(post => {
    html += `
      <div>
        <h3>"${post.title}" - By: ${post.author.name}</h3>
      </div>
    `
  })

  document.querySelector('#posts').innerHTML = html
})
