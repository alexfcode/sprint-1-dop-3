import {useState} from 'react';
import './App.css';
import {Country} from "./Country";
import {v1} from "uuid";

export type BanknotsType = 'USD' | 'RUB' | 'All'
export type MoneyType = {
    banknote: BanknotsType
    nominal: number
    id: string
}
let defaultMoney: MoneyType[] = [  // типизируем
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
    {banknote: 'USD', nominal: 100, id: v1()},
    {banknote: 'RUB', nominal: 100, id: v1()},
]
export const moneyFilter = (money: MoneyType[], filter: BanknotsType): MoneyType[] => {
    if (filter === "All") {
        return money
    } else {
         return money.filter(m => m.banknote === filter)
    }
   
}

export const App = () => {
    const [money, setMoney] = useState<MoneyType[]>(defaultMoney)
    const [filterValue, setFilterValue] = useState<BanknotsType>('All')   // по умолчанию указываем все банкноты

    // а вот сейчас притормаживаем. И вдумчиво: константа filteredMoney получает результат функции moneyFilter
    // в функцию передаем деньги и фильтр, по которому ихбудем выдавать(ретёрнуть)
    const filteredMoney = moneyFilter(money, filterValue)

    const addMoney = (banknote: BanknotsType) => {
        // const newMoney = {banknote: banknote, nominal: 100, id: v1()}
        // setMoney([...money, newMoney])
        setMoney([...money, {banknote, nominal: 100, id: v1()}])
    }

    const removeMoney = (banknote: BanknotsType) => {

        
        const index = money.findIndex(el => el.banknote === banknote)
         if (index !== -1) {
             setMoney(money.filter((el, i) => i !== index));
         } else {
            setMoney(money)
         }
    }

    return (
        <div className="App">
            <Country
                data={filteredMoney}   //отрисовать будем деньги после фильтрации
                setFilterValue={setFilterValue}  //useState передаем? Так можно было?!
                addMoney={addMoney}
                removeMoney={removeMoney}
            />
        </div>
    );
}
