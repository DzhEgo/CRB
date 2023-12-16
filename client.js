const soap = require('soap')
const fs = require('fs')
const path = require('path')
const wsdlPath = path.resolve(__dirname, 'crb.wsdl')

const runWebServiceClient = async () => {
  try {
    const wsdlContent = fs.readFileSync(wsdlPath, 'utf-8')
    const client = await soap.createClientAsync(wsdlContent)
    if (process.argv.length === 2) {
      const result = await client.getValutesAsync({})
      console.log(result)
    } else if (process.argv.length === 5) {
      const fromDate = new Date(process.argv[3]).toISOString().slice(0, 19)
      const toDate = new Date(process.argv[4]).toISOString().slice(0, 19)

      const result = await client.getValuteAsync({
        FromDate: fromDate,
        ToDate: toDate,
        ValutaCode: process.argv[2],
      })
      console.log(result)
    }
    console.log('Клиент запущен!');
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

runWebServiceClient()
