import { parse } from "path";

const months  = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']


export const calculateTotals = (transactions: any[]) => {
    let totalIncomes = 0;
    let totalExpenses = 0;

    for (const transation of transactions) {
        if (transation.type === 'Ingreso') totalIncomes += transation.amount;
        if (transation.type === 'Gasto')  totalExpenses += transation.amount;
    }

    return { totalIncomes, totalExpenses };
}


export const validateMonth = (monthRaw: any) => {

    

    if (Array.isArray(monthRaw)) {               
        monthRaw = monthRaw[0]; 
    }

    if (typeof monthRaw !== 'string') {
        return {status: false, message: 'month must be a string'};
    }

    const month = parseInt(monthRaw, 10);
    
    if (!month || month < 1 || month > 12) {
        return {status: false, message: 'month must be an integer between 1 and 12'};      
    };

    return {status: true, month: month};

}



export const getCurrencySymbol = (currency: string) => {
     

    const currencyMap: Record<string, {symbol: string, name: string}> = {
        EUR: {symbol: '€', name: 'Euro' },
        USD: {symbol: '$', name: 'Dolar americano' },
        GBP: {symbol: '£', name: 'Libra inglesa' }
    }


    const {symbol} = currencyMap[currency]

    if(!symbol) {
        return {'isOK': false, currencyCode: null}        
    }

    return {'isOK': true, currencyCode: symbol}        
    

    
    

}

export const getmonthName = (month: number): { monthName: string; monthStart: string } => {

    let monthName = months[month - 1].charAt(0).toUpperCase() + months[month - 1].slice(1); // Capitaliza la primera letra del mes
    
        

    const monthStart= monthName.slice(0,3).toUpperCase() 

    


    return {monthName, monthStart}


}


export const getFirstAndLastsDaysOfMonth = (firstDayOfMonth: Date, lastDayOfMonth: Date): number[][] => {

    const days: number[][] = [];

  let day = new Date(firstDayOfMonth);
  day.setHours(0, 0, 0, 0); // elimina efectos por zonas horarias

  let weekIndex = 0; // índice de la semana actual

  while (day <= lastDayOfMonth) {
    
    
    if (day.getDate() === firstDayOfMonth.getDate() || day.getDay() === 1 || day.getDate() === lastDayOfMonth.getDate() || day.getDay() === 0) {
      // Si es lunes (1) o primer día del mes, iniciamos una nueva semana
      
      if (!days[weekIndex]) {
        days[weekIndex] = [];
      }

      days[weekIndex].push(day.getDate());



      
    }
    
    

    // Si es domingo (0) o último día del mes, cerramos la semana
    if (day.getDay() === 0 || day.getTime() === lastDayOfMonth.getTime()) {      
      
      weekIndex++; // incrementamos el índice de la semana
    }

    day.setDate(day.getDate() + 1);
  }

  

  return days; // devuelve un array con el primer y último día de cada semana del mes
  

}
