import { useEffect, useState } from "react";
import { ICity } from "../Infrastructure/Interfaces";
import useApiCaller from "../hooks/ApiCallerHook";
import DataDisplay from "../Components/DataDisplay";


const HomePg = () => {
    const arrCities: Array<ICity> = [
        { id: 1, name: "Dublin"},
        { id: 2, name: "Belfast"},
        { id: 3, name: "Galway"}
    ];

    const apiCaller = useApiCaller();

    const [citySelected, setCitySelected] = useState<number>(0);
    const [selectedCity, setSelectedCity] = useState<ICity>({ id: 0, name: ""});
    const [refreshData, setRefreshData] = useState<number>(0);
    const [weatherLoaded, setWeatherLoaded] = useState<boolean>();
    const [timezoneLoaded, setTimezoneLoaded] = useState<boolean>();
    const [astronomyLoaded, setAstronomyLoaded] = useState<boolean>();
    const [refreshWeatherCount, setRefreshWeatherCount] = useState<number>(0);
    
    const [selectedTab, setSelectedTab] = useState<number>(1);


    useEffect(() => {
        if (selectedCity.id > 0) {
            setWeatherLoaded(false);
            setTimezoneLoaded(false);
            setAstronomyLoaded(false);
            setRefreshWeatherCount(refreshWeatherCount + 1);
        }
    }, [citySelected]);

    useEffect(() => {
        if (refreshWeatherCount > 0) {
            showWeather();
        }
    }, [refreshWeatherCount]);


    const selectCity = (id: number) => {
        if (id !== selectedCity.id) {
            const newSelectedCity = arrCities.find(c => c.id === id);

            if (newSelectedCity !== undefined) {
                setSelectedCity(newSelectedCity);
                setCitySelected(citySelected + 1);
            }
        }
    };

    const showWeather = () => {
        setSelectedTab(1);

        if (!weatherLoaded) {
            apiCaller.Weather_Get(selectedCity.name.toLocaleLowerCase()).then(r => {
                setSelectedCity(selectedCity => {
                    return {
                        ...selectedCity,
                        weather: r
                    }
                });
    
                setRefreshData(refreshData + 1);
                setWeatherLoaded(true);
            });
        }
    };

    const showTimezone = () => {
        setSelectedTab(2);

        if (!timezoneLoaded) {
            apiCaller.Timezone_Get(selectedCity.name.toLocaleLowerCase()).then(r => {
                setSelectedCity(selectedCity => {
                    return {
                        ...selectedCity,
                        timezone: r
                    }
                });
    
                setRefreshData(refreshData + 1);
                setTimezoneLoaded(true);
            });
        }
    };

    const showAstronomy = () => {
        setSelectedTab(3);

        if (!astronomyLoaded) {
            apiCaller.Astronomy_Get(selectedCity.name.toLocaleLowerCase()).then(r => {
                setSelectedCity(selectedCity => {
                    return {
                        ...selectedCity,
                        astronomy: r
                    }
                });
    
                setRefreshData(refreshData + 1);
                setAstronomyLoaded(true);
            });
        }
    };

    const refreshWeather = () => {
        setWeatherLoaded(false);
        setRefreshWeatherCount(refreshWeatherCount + 1);
    };

    
    return (
        <>
            <div className="sideMenu">
                <h2>City</h2>

                <ul>
                    { arrCities.map((city, i) => {
                        return <li
                            key={ `city_${ i }` }
                            onClick={ () => selectCity(city.id) }
                            className={ city.id === selectedCity.id ? 'isActive' : '' }>{ city.name }</li>
                    }) }
                </ul>
            </div>

            { selectedCity.id > 0 &&
                <div className="main">
                    <ul>
                        <li className={ selectedTab === 1 ? 'isActive' : '' } onClick={ showWeather }>Weather</li>
                        <li className={ selectedTab === 2 ? 'isActive' : '' } onClick={ showTimezone }>Timezone</li>
                        <li className={ selectedTab === 3 ? 'isActive' : '' } onClick={ showAstronomy }>Astronomy</li>
                    </ul>

                    <div>
                        { selectedTab === 1 && selectedCity.weather &&
                            <>
                                <DataDisplay data={ selectedCity.weather } refreshData={ refreshData } />
                                <button className="btnTop" onClick={ refreshWeather }>Refresh</button>
                                <button className="btnBottom" onClick={ refreshWeather }>Refresh</button>
                            </>
                        }

                        { selectedTab === 2 && selectedCity.timezone && <DataDisplay data={ selectedCity.timezone } refreshData={ refreshData } /> }
                        { selectedTab === 3 && selectedCity.astronomy && <DataDisplay data={ selectedCity.astronomy } refreshData={ refreshData } /> }
                    </div>
                </div>
            }
        </>
    );
}

export default HomePg;