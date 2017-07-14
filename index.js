const bot = require('./app.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());
app.use(function (ctx, next) {
  return bot(ctx.request.body.message)
  .then(function (answere) {
    console.log(answere);
    ctx.body = answere;
    next();
  });
});

app.listen(3000);



//console.log(process.argv[2]);
