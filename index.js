const express = require('express')
const app = express()
const jokerify = require('./jokerify')
const { tmpdir } = require('os')
const dir = tmpdir()
const request = require('request')

app.use(express.static(dir))

app.get('/', async (req, res) => {
  try {
    const result = await jokerify(req, res)
    const { filename } = result.attachments[0]
    res.sendFile(filename, {
      root: dir
    })
  } catch(err) {
    res.status(500)
       .send(err)
  }
})

app.get('/api/slack', async (req, res) => {
  try {
    res.send({'text':'working on it...'})

    const result = await jokerify(req, res)
    
    if(result.response_url.length > 0){
      r.post(result.response_url,{json:
        {
          response_type: 'in_channel',
          response_url: result.responseUrl,
          attachments: result.attachments
        }
      });
    }
    
  } catch(err) {
      console.log(err);
  }
})

app.listen(8080, () => console.log('listening on port 8080'))
