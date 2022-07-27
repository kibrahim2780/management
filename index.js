const express = require('express')
const app=express()
const mysql= require('mysql')
const cors= require('cors')


app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'2901janHEXAGON',
    database:'animal_management',
    port:3306
});

app.post('/create',(req,res)=>{
const animal_type= req.body.animal_type
const breed= req.body.breed
const color= req.body.color
const animal_size= req.body.animal_size
const common_color= req.body.common_color

db.query(
    'INSERT into animal_management.insert_table (animal_type,breed,color,animal_size,common_color) VALUES(?,?,?,?,?)',
    [animal_type,breed,color,animal_size,common_color],(err,result) =>{
        if(err){
            console.log(err)
        
        }
        else
        {
            res.send('succesfull')
        }

      }
)
})

app.get('/animal_management',(req,res) => {
    db.query(
        'select * from animal_management.insert_table', (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }

        }
    )
})
app.put('/update', (req, res) => {
  console.log('console data', req.body)
  const id = req.body.id
  const animal_type = req.body.animal_type
  const breed = req.body.breed
  const color = req.body.color
  const animal_size = req.body.animal_size
  const common_color = req.body.common_color
  db.query(
    "update insert_table set animal_size=? where id=?", 
    [animal_size,id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM insert_table WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(5700,()=>{
    console.log('backend server is running')
})
