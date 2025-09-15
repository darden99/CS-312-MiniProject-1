const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; 

// routes
app.get('/', (req, res) => res.render('index', { posts }));

app.post('/create', (req, res) => 
  {
  const newPost = 
  {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    createdAt: new Date().toLocaleString()
  };
  posts.push(newPost);
  res.redirect('/');
  });

app.get('/edit/:id', (req, res) => 
  {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
  });

app.post('/edit/:id', (req, res) => 
  {
  const idx = posts.findIndex(p => p.id == req.params.id);
  if (idx > -1) 
    {
    posts[idx].title = req.body.title;
    posts[idx].author = req.body.author;
    posts[idx].content = req.body.content;
  }
  res.redirect('/');
  });

app.post('/delete/:id', (req, res) => 
  {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
  });

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
