const bot = require('./app.js');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());
app.use(function (ctx, next) {
  console.log(ctx.request.body)
  return bot(ctx.request.body.message.text || ctx.request.body.message)
  .then(function (answere) {
    const body = ctx.request.body;

    ctx.body = {
        method: "sendMessage",
        chat_id: body.message.chat.id,
        text: answere,
        reply_to_message_id: body.message.message_id
    };

    ctx.response.headers['Content-Type', 'application/json'];

    console.log("API Response recieved.");
    // ctx.body = answere;
    next();
  });
});

app.listen(process.env.PORT ||3000);



//console.log(process.argv[2]);
