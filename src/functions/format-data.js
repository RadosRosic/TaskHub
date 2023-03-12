export const formatDate = (date, locale = Navigator.language) => {
  const dateObj = new Date(date);
  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
  const dateFormated = dateObj.toLocaleDateString(locale, dateOptions);

  return dateFormated;
};

export const shortenEmail = (email) => {
  const atIndex = email.indexOf("@");
  let name = email.slice(0, atIndex);
  let domain = email.slice(atIndex + 1);

  if (name.length > 5) {
    name = name.slice(0, 4).concat("...");
  }
  if (domain.length > 3) {
    domain = "...".concat(domain.slice(-7));
  }

  return `${name}@${domain}`;
};

export const shortenText = (text) => {
  if (text.length > 100) {
    return text.slice(0, 100).concat("...");
  } else return text;
};
