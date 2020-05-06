const app = require('./app')

const port = process.env.PORT || 5001



app.listen(port, () => {
  console.log(`server has been started on ${port}`);
})
