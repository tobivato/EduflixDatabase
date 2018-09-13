// varaible declaration for imported methods from app.js and assignment for port varaibles.
const app = require('./app');
var port = process.env.PORT || 3000;

// server listening on environment port
app.listen(port, function(){
console.log("server is running");
});
