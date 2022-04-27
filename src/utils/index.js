export const fetchHandler = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) return Promise.reject(res);

  const data = await res.json();
  return data;
};

export const translateWeekday = (day) => {
  let translated;
  switch (day) {
    case "Monday":
      translated = "Montag";
      break;
    case "Tuesday":
      translated = "Dienstag";
      break;
    case "Wednesday":
      translated = "Mittwoch";
      break;
    case "Thursday":
      translated = "Donnerstag";
      break;
    case "Friday":
      translated = "Freitag";
      break;
    case "Saturday":
      translated = "Samstag";
      break;
    case "Sunday":
      translated = "Sonntag";
      break;
    default:
      translated = day;
      break;
  }
  return translated;
};

export const translateWeatherCondition = (type) => {
  let translated;

  switch (type.toLowerCase()) {
    case "partly cloudy":
      translated = "teilweise bewölkt";
      break;
    case "mostly cloudy":
      translated = "meist bewölkt";
      break;
    case "cloudy":
      translated = "bewölkt";
      break;
    case "scattered showers":
      translated = "vereinzelte Schauer";
      break;
    case "light rain showers":
      translated = "leichte Regenschauer";
      break;
    case "showers":
      translated = "Regenschauer";
      break;
    case "scattered thunderstorms":
      translated = "vereinzelte Gewitter";
      break;
    case "partly sunny":
      translated = "teilweise sonnig";
      break;
    case "mostly sunny":
      translated = "meist sonnig";
      break;
    case "sunny":
      translated = "sonnig";
      break;
    default:
      translated = type;
      break;
  }

  return translated;
};

export const getUserLocation = async (options) => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    } else {
      reject();
    }
  });
};

export const getUserLocationCity = async (forceUpdate = false) => {
  const storedLocation = localStorage.getItem("user-location-city");

  if (storedLocation && !forceUpdate) {
    return storedLocation;
  }

  try {
    const location = await getUserLocation();
    // nominatim von openstreetmaps aufrufen um Koordinaten zu decodieren
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    // XML Document einlesen und verarbeiten
    const xmlData = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    // Stadtnamen herausfiltern
    const city = xmlDoc.getElementsByTagName("town")[0].innerHTML;
    localStorage.setItem("user-location-city", city);
    return city;
  } catch (error) {
    let errorMsg;
    switch (error.code) {
      case 1:
        errorMsg =
          "Es wurde keine Erlaubnis zum Abrufen des Standortes erteilt.";
        break;
      case 2:
        errorMsg = "Der aktuelle Standort konnte nicht ermittelt werden.";
        break;
      case 3:
        errorMsg =
          "Die Verbindung zum Standortdienst hat zu lange gedauert und wurde abgebrochen.";
        break;
      default:
        errorMsg =
          error?.message ||
          "Es ist ein Fehler beim Abrufen der Standortdaten aufgetreten.";
        break;
    }
    throw errorMsg;
  }
};

export const truncateString = (input, length = 100) =>
  input.length > length ? `${input.substring(0, length)}...` : input;

export const generateImgSrc = (originalSrc, quality = 70, width = 1080) => {
  let newImgSrc = originalSrc;
  // ersetze quality Parameter der ImageSrc
  newImgSrc = newImgSrc.replace(/q=(\d{1,3})/m, `q=${quality}`);
  // ersetze width Parameter der ImageSrc
  newImgSrc = newImgSrc.replace(/width=(\d{1,5})/m, `width=${width}`);

  return newImgSrc;
};
