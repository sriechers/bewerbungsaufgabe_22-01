import {
  fetchHandler,
  translateWeekday,
  translateWeatherCondition,
} from "../utils";
import { useStore } from "../store";
import { useEffect } from "react";
import useSWR from "swr";
import GetUserLocationButton from "./GetUserLocationButton";
import Toast from "./Toast";

function WeatherWidget() {
  const location = useStore((state) => state.location);
  const setUserLocation = useStore((state) => state.setUserLocation);
  const setLoadingLocation = useStore((state) => state.setLoadingLocation);

  const { data, error, isValidating } = useSWR(
    `https://weatherdbi.herokuapp.com/data/weather/${location.toLowerCase()}`,
    fetchHandler,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    error && setUserLocation("Berlin");
  }, [error, setUserLocation]);

  useEffect(() => {
    isValidating && setLoadingLocation(true);
  }, [isValidating, setLoadingLocation]);

  useEffect(() => {
    data && setLoadingLocation(false);
  }, [data, setLoadingLocation]);

  return (
    <section id="current-weather">
      {error && (
        <Toast text="Die Wetterdaten konnten nicht abgerufen werden." />
      )}
      <div className="scaffold">
        <div className="headline-wrapper">
          <h2>Aktuelles Wetter</h2>
          <GetUserLocationButton />
        </div>
        <div
          id="current-weather-widget"
          data-is-loading={isValidating}
          data-error={!!error}
          className="current-weather-widget"
        >
          {error && (
            <p className="error-text">
              Die aktuellen Wetterdaten konnten nicht abgerufen werden.
            </p>
          )}
          {data && (
            <>
              <h3 className="region">{data.region.split(",")[0]}</h3>
              <div className="weather-infos">
                <div className="weather-current-temperature flex items-end">
                  <img
                    title={translateWeatherCondition(
                      data.currentConditions.comment
                    )}
                    className="weather-icon"
                    src={data.currentConditions.iconURL}
                    alt={`Wettericon für ${translateWeatherCondition(
                      data.currentConditions.comment
                    )}`}
                  />
                  <p className="temperature">
                    {data.currentConditions.temp.c}°C
                  </p>
                </div>
                <div className="weather-details-container">
                  <div className="weather-details">
                    <h4>Luftfeuchtigkeit</h4>
                    <p>{data.currentConditions.humidity}</p>
                  </div>
                  <div className="weather-details">
                    <h4>Niederschlag</h4>
                    <p>{data.currentConditions.precip}</p>
                  </div>
                  <div className="weather-details">
                    <h4>Wind</h4>
                    <p>{data.currentConditions.wind.km}km/h</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {!error && <h3>Wettertrend</h3>}
      </div>
      {!error && (
        <ol
          id="weather-forecast-widget"
          data-is-loading={isValidating}
          data-error={!!error}
          className="weather-forecast-widget"
        >
          {data?.next_days?.map(
            ({ comment, day, max_temp, min_temp, iconURL }, i) => (
              <li key={`weather-forecast_${i}_${day}`}>
                <img
                  title={translateWeatherCondition(comment)}
                  width="48px"
                  height="48px"
                  src={iconURL}
                  alt={`Wettericon für ${translateWeatherCondition(comment)}`}
                />
                <h3>{i === 0 ? "Heute" : translateWeekday(day)}</h3>
                <div className="temperatures">
                  <p
                    className="min-temp"
                    title="minimale Temperatur"
                    aria-label="minimale Temperatur"
                  >
                    {min_temp.c}°C
                  </p>
                  <span>–</span>
                  <p
                    className="max-temp"
                    title="maximale Temperatur"
                    aria-label="maximale Temperatur"
                  >
                    {max_temp.c}°C
                  </p>
                </div>
              </li>
            )
          )}
        </ol>
      )}
    </section>
  );
}

export default WeatherWidget;
