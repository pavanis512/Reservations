import app from './main';
import config from './config/app';

const port = config.app.PORT
app.listen(port, function () {
    return console.log(`Server is running on ${port}`);
});
