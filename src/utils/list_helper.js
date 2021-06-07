const _ = require('lodash')

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.totalLikes)
    if (likes.length > 0) {
        return likes.reduce((acc, curr) => acc + curr)
    } else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((blog) => blog.totalLikes)
    const max = likes.reduce((a, b) => {
        return Math.max(a, b)
    })
    return blogs.find((blog) => blog.totalLikes === max)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map((blog) => blog.author)
    const { countBy, entries, flow, last, maxBy, partialRight } = _
    const result = flow(countBy, entries, partialRight(maxBy, last))(authors)
    return { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
    let authorLikes = blogs.reduce((op, { author, totalLikes }) => {
        op[author] = op[author] || 0
        op[author] += totalLikes
        return op
    }, {})
    // console.log(authorLikes)
    let mostLikes = Object.keys(authorLikes).sort(
        (a, b) => authorLikes[b] - authorLikes[a]
    )[0]
    return { author: mostLikes, totalLikes: authorLikes[mostLikes] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
