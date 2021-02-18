const Controller = require('../controller/Controller')
const controller = new Controller()

module.exports = (app) => {
    app.get('/', controller.transform(app))
}
