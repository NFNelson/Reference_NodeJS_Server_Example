var express = require('express');
var app = express();
var url = require('url');
var path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get('/',function (req, res){
    res.render(path.join(__dirname + '/Calc.ejs'), {CurrentNum: 0, History:"", array:'[]'});
});
console.log("waiting on port 8088");
app.listen(8088);

app.get('/calcinput', function(req, res){ //storying data from this form.
    var newInput = req.query.InputVal; 
    
}); 
app.post('/add')
app.post('/', function(req,res){
    console.log(req.body);
    var userinput = parseInt(req.body.InputVal);
    var currentval = parseInt(req.body.CurrentVal);
    var history = "";
    var array = JSON.parse(req.body.array);
    if(req.body.Subtract){
       currentval -= userinput;
       array.push({op:"-", val:userinput});
       for(i=0; i<array.length;i++){
       history+=array[i].op +array[i].val+ "\n";

       }
       res.render(__dirname+'/Calc.ejs', {CurrentNum:currentval, History:history,array:JSON.stringify(array)});

    }
    if(req.body.Add){
       currentval += userinput;
       array.push({op:"+", val:userinput});
       for(i=0; i<array.length;i++){
        history+=array[i].op +array[i].val+ "\n";
 
        }
       res.render(__dirname+'/Calc.ejs', {CurrentNum:currentval, History:history,array:JSON.stringify(array)});

    }
    if(req.body.Pop){
        var change =array.pop();
        if(change.op =="-"){
            currentval+=change.val;
        }
        if(change.op =="+"){
            currentval-=change.val;
        }
        for(i=0; i<array.length;i++){
            history+=array[i].op +array[i].val+ "\n";
     
            }
        res.render(__dirname+'/Calc.ejs', {CurrentNum:currentval, History:history,array:JSON.stringify(array)});
    }
    if(req.body.reset){
        res.redirect('/');
    }

});

app.get('/error', function(req, res){
    res.status(400);
    res.send("This is a bad request");




});