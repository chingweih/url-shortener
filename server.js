const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  if (req.body.fullUrl == null) {
    return res.sendStatus(400)
  }

  if (req.body.shortUrl == '') {
    await ShortUrl.create({ full: req.body.fullUrl })
  } else {
    await ShortUrl.create({ full: req.body.fullUrl, short: req.body.shortUrl })
  }

  res.redirect('/')
})

app.get('/delete/:id', async (req, res) => {
  try {
    await ShortUrl.findByIdAndRemove(req.params.id)
  } catch (err) {
    return res.sendStatus(404)
  }

  res.redirect('/')
})

app.get('/:reqShortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.reqShortUrl })
  if (shortUrl == null) {
    return res.sendStatus(404)
  }

  shortUrl.clicks++
  await ShortUrl.replaceOne({ _id: shortUrl._id }, shortUrl)

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 3000)
