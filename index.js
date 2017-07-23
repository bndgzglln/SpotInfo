const bot = require('./app.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());
app.use(function (ctx, next) {
  console.log(ctx.request.body)
  return bot(ctx.request.body.message)
  .then(function (answere) {

    console.log("API Response recieved.");
    ctx.body = answere;
    next();
  });
});

app.listen(process.env.PORT ||3000);



//console.log(process.argv[2]);
