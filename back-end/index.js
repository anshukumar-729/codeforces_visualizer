var express = require('express'); 
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3020;

const scrapper =  require("./scrape.js")
const actions = require("./polymorphism")








app.get('/hello', (req, res) => {
    res.send({
        data:'hello world'
    })
})

app.post('/profile/', async (req, res) => {
   
    // const params = [["anshukumar_729"],["anshukumar_729","amarbudhiraja"]]
    
    const params = req.body.userids;
    console.log(req.body)
    console.log(params)

    try {
        
        let obj = new actions.Rapper(params)
        const result  = await obj.run();
        res.send({ status: "ok" ,result:result});
    } catch(err) {
        res.send({ status: 'error' })
    }

    
})

app.listen(port, () => {
  console.log(`connection is setup at http://localhost:${port}`);
});