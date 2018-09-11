const express = require('express')
const axios = require('axios')

const app = express();


app.use(express.static(__dirname + '/JokesFF1/build'));

app.get( '/joke_api', async (req, res) => {
  console.log('====got the request')
  let {data} = await axios.get(`https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten`)
  res.json(data)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`app listening on port ${PORT} yo`))
