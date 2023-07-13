const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const app = express();
const authRouter = require('./routes/auth.js');
const { NotFoundError } = require("./utilities/error.js");
const port = process.env.PORT || 3001

app.use(morgan("tiny"))
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
})

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError)
  })
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })

module.exports = app