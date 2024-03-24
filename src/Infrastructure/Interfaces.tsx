import { AstronomyInfo, TimezoneInfo, WeatherInfo } from "./Classes";
import { EnumApiMethod, EnumDataDisplayGroup } from "./Enums";


/* ***** API ***** */
export interface IApiRequest {
    Method: EnumApiMethod;
    Url: string;
    Data?: any;
    Headers?: any;
}

export interface IApiResponse {
    SuccessResponse?: any;
    ErrorResponse?: IApiResponseError;
}

export interface IApiResponseError {
    HasError: boolean;
    Message?: string;
    Data?: any;
    Status?: string;
}
/* ***** API ***** */


/* ***** COMPONENT PROPS ***** */
export interface IDataDisplayProps<T> {
    data: T;
    className?: string;
    heading?: string;
    refreshData?: number;
}

export interface IDataRowMetaData {
    Heading: string;
    Group: EnumDataDisplayGroup;
    Order: number;
    FieldName: string;
}
/* ***** COMPONENT PROPS ***** */


/* ***** STORE ***** */
export interface IAppVars {
    DataLoading: boolean;
    AppError: IApiResponseError;
}
/* ***** STORE ***** */


/* ***** CITY ***** */
export interface ICity {
    id: number;
    name: string;
    weather?: WeatherInfo;
    timezone?: TimezoneInfo;
    astronomy?: AstronomyInfo;
}
/* ***** CITY ***** */


/* ***** WEATHER ***** */
export interface IWeatherInfo {
    current: IWeatherCurrent;
}

export interface IWeatherCurrent {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: IWeatherCurrentCondition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

export interface IWeatherCurrentCondition
{
    text: string;
    icon: string;
    code: number;
}
/* ***** WEATHER ***** */


/* ***** TIMEZONE ***** */
export interface ITimezoneInfo {
    location: ITimezoneInfoLocation;
}

export interface ITimezoneInfoLocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}
/* ***** TIMEZONE ***** */


/* ***** ASTRONOMY ***** */
export interface IAstronomyInfo {
    astronomy: IAstronomyAstronomy;
}

export interface IAstronomyAstronomy {
    astro: IAstronomyAstronomyAstro;
}

export interface IAstronomyAstronomyAstro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up: number;
    is_sun_up: number;
}
/* ***** ASTRONOMY ***** */