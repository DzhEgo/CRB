const soap = require('soap')
const http = require('http')
const wsdlUrl = 'https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL'

const myService = {
  MyService: {
    MyPort: {
      getValute: (args, callback) => {
        soap.createClient(wsdlUrl, (err, client) => {
          if (err) {
            console.error('Ошибка в создании клиента:', err)
            return callback(err)
          }

          console.log('SOAP клиент успешно создан!')
          const dinamic = []

          client.GetCursDynamicXML(args, (err, result) => {
            if (err) {
              console.error('Ошибка запроса:', err)
              return callback(err)
            }

            const output = result.GetCursDynamicXMLResult.ValuteData.ValuteCursDynamic
            for (let i = 0; i < output.length; i++) {
              dinamic[i] = {
                date: output[i].CursDate.slice(0, 10),
                value: output[i].Vcurs,
              }
            }

            console.log(dinamic)
            callback(null, dinamic)
          })
        })
      },
      getValutes: (args, callback) => {
        soap.createClient(wsdlUrl, (err, client) => {
          if (err) {
            console.error('Ошибка в создании клиента:', err)
            return callback(err)
          }

          console.log('SOAP клиент успешно создан!')
          const args1 = { On_date: new Date().toISOString().slice(0, 19) }
          const currencies = []

          client.GetCursOnDateXML({ On_date: args1 }, (err, result) => {
            if (err) {
              console.error('Ошибка в функции GetCursOnDateXML:', err.Fault)
              return callback(err)
            }

            const cur = result.GetCursOnDateXMLResult.ValuteData.ValuteCursOnDate

            client.EnumValutesXML(args, (err, result) => {
              if (err) {
                console.error('Ошибка запроса:', err)
                return callback(err)
              }

              const output = result.EnumValutesXMLResult.ValuteData.EnumValutes

              for (let i = 0; i < cur.length; i++) {
                for (let j = 0; j < output.length; j++) {
                  if (cur[i].Vname == output[j].Vname) {
                    currencies[i] = {
                      code: output[i].Vcode,
                      name: output[i].Vname,
                      value: cur[i].Vcurs,
                    }
                  }
                }
              }

              console.log(currencies);
              callback(null, currencies);
            })
          })
        })
      },
    },
  },
}



const wsdl = require('fs').readFileSync('./crb.wsdl', 'utf8')
const server = http.createServer((request, response) =>
  response.end('404')
)

server.listen(3000)

soap.listen(server, '/', myService, wsdl, () =>
  console.log('Сервер запущен на порту 3000...')
)
