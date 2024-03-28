const dummy = (blogs) => {
    
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    newarr = []

    blogs.forEach(blog => newarr.push(blog.likes))
    const mostlikes = Math.max(...newarr)

    const favorite = blogs.find(blog => blog.likes === mostlikes)
    delete favorite.__v
    delete favorite._id
    delete favorite.url

    return favorite
}

const mostBlogs = (blogs) => {
    authors = []
    newarr = []
    occurences = []
    amounts = []
    
    blogs.forEach(blog => authors.push(blog.author))
    authors.forEach(author => newarr.push(blogs.filter(blog => blog.author === author)))
    newarr.forEach(x => occurences.push([x[0].author, x.length]))
    occurences.forEach(x => amounts.push(x[1]))

    const mostblogs = Math.max(...amounts)

    const record = occurences.find(x => x[1] === mostblogs)

    return {
        author: record[0],
        blogs: record[1]
    }
}

const mostLikes = (blogs) => {
    authors = []
    newarr = []
    likearr = []
    amounts = []
    
    blogs.forEach(blog => authors.push(blog.author))
    authors.forEach(author => newarr.push(blogs.filter(blog => blog.author === author)))

    const reducer = (sum, item) => {
        return sum + item.likes
    }

    newarr.forEach(x => likearr.push([x[0].author, x.reduce(reducer, 0)]))
    likearr.forEach(x => amounts.push(x[1]))

    const mostlikes = Math.max(...amounts)

    const favorite = likearr.find(x => x[1] === mostlikes)

    return {
        author: favorite[0],
        likes: favorite[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
