
const DB = require('./lib/NoSQL.js')
const db = new DB()
const Punk = require('./lib/PunkModel.js')
const punk = new Punk(null, db)
const validateNumber = require('./lib/ValidateNumber.js')
const express = require('express')
const PORT = process.env.PORT || 10001
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const mw = require('./lib/middleware.js')

// Middle ware to ensure that the email is valid
app.use(mw(db))

// Get the beers from the external API
app.get('/v1/beers/', (req, res, next) => {
  // Normally add some kind of pagination depending on how many options are likely to come back
  // Get the data from the db. Had a really hard time with figuring out his nosql db. Havent used callbacks in 5+ years
  db.getAllRatings((err, ratings) => {
    if (err) next(err)
    // Go to external client and get the beers.
    punk.get(req.query).then((data) => {
      data.forEach((beer) => {
        // Add the rating and comments to the object
        const allRatings = ratings.filter((r) => r.beerId === beer.id)
        beer.rating = punk.getAverageRating(beer, allRatings)
        beer.ratingCount = allRatings.length
        beer.comments = allRatings.filter((rating) => rating.comments).map((rating) => rating.comments)
      })
      return res.status(200).json(data)
    }).catch(next)
  })
})

app.post('/v1/ratings/', (req, res, next) => {
  // Validate the number in its own helper function. This will make easier testing
  let rating
  // Return a 400 if the number doesn't validate
  try {
    rating = validateNumber(req.body.rating)
  } catch (err) {
    next(err)
  }

  if (!req.body.id) {
    return next(new Error('Must include an ID on all updates'))
  }

  // make sure the beer exists
  return punk.get({ ids: req.body.id.toString() }).then((beer) => {
    if (!beer.length > 0) {
      next(new Error('Beer not found'))
    } else {
      db.addRating({
        beerId: req.body.id,
        comments: req.body.comments,
        rating
      }, (err) => {
        if (err) next(new Error('Database error')) // Dont send the whole error just let them know an error occured
        return res.status(200).send()
      })
    }
  })
})
// Generic error handler
app.use((err, req, res, next) => {
  let status = 500
  if (err.message.includes('not found')) status = 404
  else if (err.message.includes('Rating') || err.message.includes('email') || err.message.includes('x-user')) status = 400
  res.status(status).send({ error: err.message })
  console.error(err)
})
app.listen(PORT, () => {
  console.log('Listening on ' + PORT)
})
