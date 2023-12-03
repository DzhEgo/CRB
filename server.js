const http = require('http')
const soap = require('soap')

const cbrService = {
    DailyInfo: {
        DailyInfoSoap: {
            GetCursOnDateXML: function (args) {
                console.log('GetCursOnDateXML вызов с параметрами:', args)
                return {
                    ValuteData: [
                        { ValuteCode: 'R01010', Name: 'Австралийский доллар', Value: 16.0102 },
                        { ValuteCode: 'R01090', Name: 'Белорусский рубль', Value: 18.4290 },
                    ]
                }
            },
            GetCursDynamicXML: function (args) {
                console.log('GetCursDynamicXML вызов с параметрами:', args)
                return {
                    ValuteDynamicData: [
                        { Date: '01.03.2023', Value: 50.4031 },
                        { Date: '02.03.2023', Value: 50.7946 },
                    ]
                }
            },
            EnumValutesXML: function (args) {
                console.log('EnumValutesXML вызов с параметрами:', args)
                return {
                    ValuteData: [
                        { ValuteCode: 'R01010', Name: 'Австралийский доллар', Value: 16.0102 },
                        { ValuteCode: 'R01090', Name: 'Белорусский рубль', Value: 18.4290 },
                    ]
                }
            }
        }
    }
}

const wsdl = require('fs').readFileSync('cbr.wsdl', 'utf8')
const server = http.createServer((request, response) => response.end('Ошибка в создании сервера'))
server.listen(8000)

soap.listen(server, '/cbr', cbrService, wsdl, () =>
    console.log('SOAP-сервер запущен...'),
    console.log('Адрес: http://localhost:8000/cbr?wsdl')
)