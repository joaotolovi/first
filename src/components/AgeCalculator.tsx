import React, { useState } from "react";

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};

const daysUntilNextBirthday = (birthDate: Date): number => {
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const AgeCalculator: React.FC = () => {
  const [birthYear, setBirthYear] = useState<number | "">("");
  const [birthMonth, setBirthMonth] = useState<number | "">("");
  const [birthDay, setBirthDay] = useState<number | "">("");
  const [age, setAge] = useState<number | null>(null);
  const [daysToBirthday, setDaysToBirthday] = useState<number | null>(null);

  const handleCalculate = () => {
    if (birthYear && birthMonth && birthDay) {
      const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
      const calculatedAge = calculateAge(birthDate);
      setAge(calculatedAge);

      const daysUntilBirthday = daysUntilNextBirthday(birthDate);
      setDaysToBirthday(daysUntilBirthday);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : "";
    setBirthYear(value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : "";
    setBirthMonth(value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : "";
    setBirthDay(value);
  };

  return (
    <div>
      <h2>Calculadora de Idade</h2>
      <div>
        <label>
          Ano de Nascimento:
          <input
            type="number"
            value={birthYear}
            onChange={handleYearChange}
            placeholder="Ex: 1990"
          />
        </label>
      </div>
      <div>
        <label>
          Mês de Nascimento:
          <input
            type="number"
            value={birthMonth}
            onChange={handleMonthChange}
            placeholder="Ex: 5"
            min="1"
            max="12"
          />
        </label>
      </div>
      <div>
        <label>
          Dia de Nascimento:
          <input
            type="number"
            value={birthDay}
            onChange={handleDayChange}
            placeholder="Ex: 25"
            min="1"
            max="31"
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calcular</button>

      {age !== null && (
        <div>
          <h3>Você tem {age} anos.</h3>
        </div>
      )}

      {daysToBirthday !== null && (
        <div>
          <h3>Faltam {daysToBirthday} dias para o seu próximo aniversário.</h3>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
