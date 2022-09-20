const Koa = require('koa');
const json = require("koa-json");
const koaRouter = require('koa-router');
const config = require ('./configs')


const app = new Koa();
const router = new koaRouter();
app.use(logger());


//mongoose connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true},() => {
    console.log(' connected to mongodb')
})

//json Prettier Middleware
app.use(json());

//Index 
 
router.get('/', async ctx =>{
    await ctx.render('index');
})

router.get('/test', ctx => (ctx.body ='hello text'));
// Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
    console.log(`${config.serviceName} listening at http://${config.host}:${config.port}`);
  });
  
