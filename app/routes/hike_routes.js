// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for hikes
const Hike = require('../models/hike')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { hike: { title: '', text: 'foo' } } -> { hike: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /hikes
router.get('/hikes', (req, res, next) => {
  console.log(req.query)
  if (req.query.owner !== 'all'){
    Hike.find({owner:req.query.owner})
      .populate('owner')
      .then(hikes => {
        console.log(hikes)
        return hikes.map(hike => hike.toObject())
      })
      .then(hikes => res.status(200).json({ hikes: hikes }))
      .catch(next)
  } else {
    Hike.find()
      .populate('owner')
      .then(hikes => {
        return hikes.map(hike => hike.toObject())
      })
      .then(hikes => res.status(200).json({ hikes: hikes }))
      .catch(next)
  }
})

// SHOW
// GET
router.get('/hikes/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Hike.findById(req.params.id)
    .then(handle404)
    .then(hike => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, hike)
      // pass the result of Mongoose's `.update` to the next `.then`
      return hike
    })
    // if `findById` is succesful, respond with 200 and "hike" JSON
    .then(hike => res.status(200).json({ hike: hike.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /hikes
router.post('/hikes', requireToken, (req, res, next) => {
  // set owner of new hike to be current user
  req.body.hike.owner = req.user.id

  Hike.create(req.body.hike)
    // respond to succesful `create` with status 201 and JSON of new "hike"
    .then(hike => {
      res.status(201).json({ hike: hike.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /hikes/5a7db6c74d55bc51bdf39793
router.patch('/hikes/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.hike.owner

  Hike.findById(req.params.id)
    .then(handle404)
    .then(hike => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, hike)

      // pass the result of Mongoose's `.update` to the next `.then`
      return hike.updateOne(req.body.hike)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE
router.delete('/hikes/:id', requireToken, (req, res, next) => {
  Hike.findById(req.params.id)
    .then(handle404)
    .then(hike => {
      // throw an error if current user doesn't own `hike`
      requireOwnership(req, hike)
      // delete the hike ONLY IF the above didn't throw
      hike.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
