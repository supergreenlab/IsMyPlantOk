const express = require('express')
const fileUpload = require('express-fileupload')
const imagemagick = require('imagemagick-native')
const Discord = require('discord.js')
const client = new Discord.Client()

const { GUILD_ID, CHANNEL_ID, TOKEN } = process.env
const PORT = 3000
let imwo

client.on('ready', () => {
  imwo = client.guilds.get(GUILD_ID).channels.get(CHANNEL_ID)
  console.log(`Logged in as ${client.user.tag}!`)
})

client.login(TOKEN)

const app = express()

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))

app.post('/', async (req, res) => {
  let { pic } = req.files
  if (!pic) {
    res.writeHead(404, {'Content-Type': 'text'})
    res.end('NOK')
    return
  }
  pic = await imagemagick.promises.convert({
    srcData: pic.data,
    width: 1500,
    height: 1500,
    resizeStyle: 'aspectfit',
    gravity: 'Center',
    format: 'png',
  })
  imwo.send(req.body.text, {
    files: [{
      attachment: pic,
      name: 'pic.png'
    }],
  })
  res.writeHead(200, {'Content-Type': 'text'})
  res.end('OK')
})

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`)
})
