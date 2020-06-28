const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://makai:${password}@cluster0-ozykp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv.length ===3){
    //show the password
    console.log("No args finding numbers")
    Contact.find({}).then(res=>{
        console.log("Phonebook:")
        res.forEach(elem=>{
            console.log(`${elem.name}: ${elem.number}`)
        })
        mongoose.connection.close()
    })
}
else{
    //save the data
    console.log("Args found saving number")
    const number = new Contact({
        name: process.argv[3],
        number: parseInt(process.argv[4])
      })
    console.log(number)
    number.save().then(result => {
        console.log(`added ${number.name} number ${number.number} to phonebook`)
        mongoose.connection.close()
    })
}

