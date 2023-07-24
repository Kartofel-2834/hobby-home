export default function parseDate(date) {
  const v = new Date(date);
  const now = new Date();

  const seconds = now.getSeconds() - v.getSeconds();
  const minutes = now.getMinutes() - v.getMinutes();
  const hours = now.getHours() - v.getHours();
  const days = now.getDate() - v.getDate();
  const months = now.getMonth() - v.getMonth();
  const year = now.getFullYear() - v.getFullYear();

  const parse = (v, replacements = []) => {
    if (v >= 10 && v % 100 >= 10 && v % 100 < 20) {
      return `${v} ${replacements[2]} назад`;
    }

    const lastDigit = v % 10;

    switch (lastDigit) {
      case 1:
        return `${v} ${replacements[0]} назад`;
      case 2:
      case 3:
      case 4:
        return `${v} ${replacements[1]} назад`;
      default:
        return `${v} ${replacements[2]} назад`;
    }
  };

  if (year > 5) {
    return v.toLocaleDateString();
  }

  if (year > 0) {
    return parse(year, ["год", "года", "лет"]);
  }

  if (months > 0) {
    return parse(months, ["месяц", "месяца", "месяцев"]);
  }

  if (days > 0) {
    return parse(days, ["день", "дня", "дней"]);
  }

  if (hours > 0) {
    return parse(hours, ["час", "часа", "часов"]);
  }

  if (minutes > 0) {
    return parse(minutes, ["минуту", "минуты", "минут"]);
  }

  if (seconds > 0) {
    return parse(seconds, ["секунду", "секунды", "секунд"]);
  }

  if (seconds === 0) {
    return "сейчас";
  }

  return v.toLocaleDateString();
}
