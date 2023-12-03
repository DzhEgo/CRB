const soap = require('soap')
const url = 'http://localhost:8000/cbr?wsdl'

soap.createClient(url, (err, client) => {
    if (err) console.log("Ошибка создания SOAP клиента: ", err)
    
    if (client) {
        client.EnumValutesXML({ Seld: false }, (err, result, rawResponse, soapHeader, rawRequest) => {
            if (err) console.log("Ошибка вызова EnumValutesXML: ", err)
            
            console.log("Результат: ", result)
        })
    }
})