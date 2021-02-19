const bodyParser = require('body-parser')

class Controller {

    toInt(romans, roman){
        const value = romans.find((romans) => {
            return romans.roman == roman
        })

        return value.value
    }


    transform(app){
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        return (req, res) => {
            const romans = require('../model/Roman')
            const number = req.body.number.toUpperCase()

            let integer = 0;

            for(let i = 0; i < number.length; i++){
                let atualRoman = number[i]

                let value = this.toInt(romans, atualRoman)
                let next = number[i + 1] ? this.toInt(romans, number[i + 1]) : 0

                if(i == 0){
                    if(value >= next)
                        integer = value
                    else
                        integer = next
                }

                if(number[i + 1]){
                    if(value >= next){
                        integer += next
                    }
                    else if(value < next){
                        integer -= value
                    }
                } else {
                    if(number.length > 2){
                        let previous = this.toInt(romans, number[i - 1])
                        if(value >= previous){
                            integer += value - previous
                        }
                    }
                }
            }

            res.json({
                "number" : integer
            })
        }
    }
}

module.exports = Controller
