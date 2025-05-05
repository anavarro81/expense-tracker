import { getmonthName, getFirstAndLastsDaysOfMonth  } from "../utils/utils";
import TransactionModel from "../models/transations.model";



export const getTransationsInMonth = async (month: string, year: number) => {

  const monthNumber = parseInt(month)  

  const firstDayOfMonth = new Date(year, monthNumber - 1, 1);              
  const lastDayOfMonth = new Date(year, monthNumber, 0);

  // Obtiene el mes y su abreviatura con tres letras
  const {monthName, monthStart} = getmonthName(monthNumber)

  console.log('monthName, monthStart: ', monthName, monthStart);
  
  // Obtiene un array con el primer y último día de cada semana del mes
  const firstAndLastDays = getFirstAndLastsDaysOfMonth(firstDayOfMonth, lastDayOfMonth)

  console.log('firstAndLastDays: ', firstAndLastDays);
  

  const totalExpenses = await getTotalAmountByMonth(monthNumber, 2025)

  console.log('totalExpenses: ', totalExpenses);
  
  
  const transations = await getAmountsByWeek(monthNumber, year)

  console.log('transations: ', transations);
  
  const weeklyExpense = transations.map((transation, index) => {

    return {

      week: monthStart + ` S` + (index + 1), 
      weeekRange: firstAndLastDays[index][0].toString() + '-' + firstAndLastDays[index][1].toString() + ' ' + monthName,// rango de fechas de la semana       
      totalAmount: transation.totalAmount,
      percentage: ((transation.totalAmount / totalExpenses) * 100).toFixed(0) + '%' // porcentaje del gasto de la semana respecto al total del mes

    }

  })

  console.log('weeklyExpense: ', weeklyExpense);
  
  

}

// Obtiene el gasto agupado pr semana del mes
export const getAmountsByWeek = async (month: number, year: number) => {

   

  const firstDayOfMonth = new Date(year, month - 1, 1);              
  const lastDayOfMonth = new Date(year, month, 0);


  const transations = await TransactionModel.aggregate([
    // 1) Filtramos por fecha dentro del mes
    { $match: {
        date: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
      }
    },

    {
      $group: {
        _id: {
          $dateTrunc: {
            date: "$date",          // Agrupamos por fecha
            unit: "week",           // Agrupamos por semana
            binSize: 1,            // Agrupamos de una en una semana
            startOfWeek: "mon"     // Indica el inicio de la semana
          }
        },
        totalAmount: { $sum: "$amount" }
      }
    },
    // 4) Ordenamos por semana ascendente
    { $sort: { _id: 1 } }
  ]);

  return transations

}


export const getTotalAmountByMonth = async (month: number, year: number) => {

    // Obtiene el gasto total del mes. 
    // $group agrupa y suma el importe: amount
    try {

        const result = await TransactionModel.aggregate([
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$date" }, month] },
                    { $eq: [{ $year: "$date" }, year] }
                  ]
                }
              }
            },
            {
              $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
              }
            }
          ]);

          return result[0]?.totalAmount || 0;
        
    } catch (error) {
        console.log('Error obteniendo el total de transacciones', error);
        throw new Error(`Error al obtener el total de transacciones: ${error}`);
    }
    

}




