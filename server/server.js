const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '../public');
console.log(publicPath);

// app.use(express.static(publicPath));
var app = express();

app.use(express.static(publicPath));


// app.get('/', (req,res)=>{
//   // res.render('../public/index.html')
//   res.sendFile(publicPath +'/index.html');
// })
app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
