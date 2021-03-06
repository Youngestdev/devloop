const Blog = require('../model/schema')

module.exports = {
  // Home page
  redirect: (req, res) => {
    // For now we will redirect to the blog page
    res.redirect('/blogs')
  },

  // INDEX ROUTE
  getBlogs: (req, res) => {
    Blog.find()
      .then(blogs => {
        res.render('index', { blogs })
      })
  },

  // NEW POST FORM
  newBlog: (req, res) => {
    // Render a form for new Blog post creation
    res.render('new')
  },

  // CREATE BLOG
  createBlog: (req, res) => {
    // Handle form data coming from new blog post page
    // sanitize
    req.body.blog.body = req.sanitize(req.body.blog.body)

    const post = req.body.blog
    Blog.create(post)
      .then((blog) => {
        res.redirect('/blogs')
      })
      .catch(err => {
        res.render('new')
      })
  },

  // SHOW BLOG
  showBlog: (req, res) => {
    // Show details about a blog using it's id
    const blogId = req.params.id
    Blog.findById(blogId)
      .then(blog => {
        res.render('show', { blog })
      })
      .catch(() => {
        // render Error page later
        res.redirect('/blogs')
      })
  },

  // EDIT BLOG
  editBlog: (req, res) => {
    // Render form for editing a Blog post
    const blogId = req.params.id
    Blog.findById(blogId)
      .then(blog => {
        res.render('edit', { blog })
      })
      .catch(() => {
        res.redirect('/blogs')
      })
  },

  // UPDATE BLOG
  updateBlog: (req, res) => {
    // update blog details by blog's id
    // sanitize
    req.body.blog.body = req.sanitize(req.body.blog.body)

    const blogId = req.params.id
    const updatedBlog = req.body.blog
    Blog.findByIdAndUpdate(blogId,  updatedBlog )
      .then(blog => {
        res.redirect(`/blogs/${blogId}`)
      })
      .catch(() => {
        res.redirect('/blogs')
      })
  },

  // DELETE BLOG
  deleteBlog: (req, res) => {
    // delete a blog post by it's id
    const blogId = req.params.id
    Blog.findByIdAndDelete(blogId)
      .then(() => {
        res.redirect('/blogs')
      })
      .catch((err) => {
        res.redirect('/blogs')
        console.log(err)
      })
  }
}