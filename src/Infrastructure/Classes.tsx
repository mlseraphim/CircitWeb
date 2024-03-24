import { GridGroup, GridOrder, PropHeading } from "./Decorators";
import { EnumDataDisplayGroup } from "./Enums";
import { IAstronomyAstronomyAstro, ITimezoneInfoLocation, IWeatherCurrent, IWeatherCurrentCondition } from "./Interfaces";


export class WeatherInfo implements IWeatherCurrent {
    @PropHeading('Last Updated Epoch')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Intro)
    last_updated_epoch: number;

    @PropHeading('Last Updated')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Intro)
    last_updated: string;

    @PropHeading('Celsius')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Temperature)
    temp_c: number;

    @PropHeading('Fahrenheit')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Temperature)
    temp_f: number;

    @PropHeading('Daytime')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Miscellaneous)
    is_day: number;

    @PropHeading('MPH')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Wind)
    wind_mph: number;

    @PropHeading('KPH')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Wind)
    wind_kph: number;

    @PropHeading('Degree')
    @GridOrder(3)
    @GridGroup(EnumDataDisplayGroup.Wind)
    wind_degree: number;

    @PropHeading('Direction')
    @GridOrder(4)
    @GridGroup(EnumDataDisplayGroup.Wind)
    wind_dir: string;

    @PropHeading('MB')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Pressure)
    pressure_mb: number;

    @PropHeading('IN')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Pressure)
    pressure_in: number;

    @PropHeading('MM')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Precipitation)
    precip_mm: number;

    @PropHeading('IN')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Precipitation)
    precip_in: number;

    @PropHeading('Humidity')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Miscellaneous)
    humidity: number;

    @PropHeading('Cloud')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Miscellaneous)
    cloud: number;

    @PropHeading('Feels Like Celsius')
    @GridOrder(3)
    @GridGroup(EnumDataDisplayGroup.Temperature)
    feelslike_c: number;

    @PropHeading('Feels Like Fahrenheit')
    @GridOrder(4)
    @GridGroup(EnumDataDisplayGroup.Temperature)
    feelslike_f: number;

    @PropHeading('KM')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Visibility)
    vis_km: number;

    @PropHeading('Miles')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Visibility)
    vis_miles: number;

    @PropHeading('UV')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Intro)
    uv: number;

    @PropHeading('Gust MPH')
    @GridOrder(5)
    @GridGroup(EnumDataDisplayGroup.Wind)
    gust_mph: number;

    @PropHeading('Gust KPH')
    @GridOrder(6)
    @GridGroup(EnumDataDisplayGroup.Wind)
    gust_kph: number;

    @PropHeading('Text')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Condition)
    conditionText: string;

    @PropHeading('Icon')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Condition)
    conditionIcon: string;

    @PropHeading('Code')
    @GridOrder(3)
    @GridGroup(EnumDataDisplayGroup.Condition)
    conditionCode: number;

    
    condition: IWeatherCurrentCondition;


    constructor(
        last_updated_epoch: number,
        last_updated: string,
        temp_c: number,
        temp_f: number,
        is_day: number,
        condition: IWeatherCurrentCondition,
        wind_mph: number,
        wind_kph: number,
        wind_degree: number,
        wind_dir: string,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        precip_in: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        feelslike_f: number,
        vis_km: number,
        vis_miles: number,
        uv: number,
        gust_mph: number,
        gust_kph: number
    ) {
        this.last_updated_epoch = last_updated_epoch;
        this.last_updated = last_updated;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.is_day = is_day;
        this.condition = condition;
        this.wind_mph = wind_mph;
        this.wind_kph = wind_kph;
        this.wind_degree = wind_degree;
        this.wind_dir = wind_dir;
        this.pressure_mb = pressure_mb;
        this.pressure_in = pressure_in;
        this.precip_mm = precip_mm;
        this.precip_in = precip_in;
        this.humidity = humidity;
        this.cloud = cloud;
        this.feelslike_c = feelslike_c;
        this.feelslike_f = feelslike_f;
        this.vis_km = vis_km;
        this.vis_miles = vis_miles;
        this.uv = uv;
        this.gust_mph = gust_mph;
        this.gust_kph = gust_kph;


        this.conditionText = condition.text;
        this.conditionIcon = condition.icon;
        this.conditionCode = condition.code;
    }
}

export class TimezoneInfo implements ITimezoneInfoLocation {
    @PropHeading('Name')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Intro)
    name: string;

    @PropHeading('Region')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Geography)
    region: string;

    @PropHeading('Country')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Geography)
    country: string;

    @PropHeading('Latitude')
    @GridOrder(3)
    @GridGroup(EnumDataDisplayGroup.Geography)
    lat: number;

    @PropHeading('Longitude')
    @GridOrder(4)
    @GridGroup(EnumDataDisplayGroup.Geography)
    lon: number;

    @PropHeading('Timezone Id')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Intro)
    tz_id: string;

    @PropHeading('Epoch')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.LocalTime)
    localtime_epoch: number;

    @PropHeading('Local Time')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.LocalTime)
    localtime: string;


    constructor(
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
        localtime_epoch: number,
        localtime: string
    ) {
        this.name = name;
        this.region = region;
        this.country = country;
        this.lat = lat;
        this.lon = lon;
        this.tz_id = tz_id;
        this.localtime_epoch = localtime_epoch;
        this.localtime = localtime;
    }
}

export class AstronomyInfo implements IAstronomyAstronomyAstro {
    @PropHeading('Sunrise')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Sun)
    sunrise: string;

    @PropHeading('Sunset')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Sun)
    sunset: string;

    @PropHeading('Moonrise')
    @GridOrder(1)
    @GridGroup(EnumDataDisplayGroup.Moon)
    moonrise: string;

    @PropHeading('Moonset')
    @GridOrder(2)
    @GridGroup(EnumDataDisplayGroup.Moon)
    moonset: string;

    @PropHeading('Phase')
    @GridOrder(3)
    @GridGroup(EnumDataDisplayGroup.Moon)
    moon_phase: string;

    @PropHeading('Illumination')
    @GridOrder(4)
    @GridGroup(EnumDataDisplayGroup.Moon)
    moon_illumination: number;

    @PropHeading('Is Up')
    @GridOrder(5)
    @GridGroup(EnumDataDisplayGroup.Moon)
    is_moon_up: number;

    @PropHeading('Is Up')
    @GridOrder(3)
    @GridGroup(EnumDataDisplayGroup.Sun)
    is_sun_up: number;


    constructor(
        sunrise: string,
        sunset: string,
        moonrise: string,
        moonset: string,
        moon_phase: string,
        moon_illumination: number,
        is_moon_up: number,
        is_sun_up: number
    ) {
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.moonrise = moonrise;
        this.moonset = moonset;
        this.moon_phase = moon_phase;
        this.moon_illumination = moon_illumination;
        this.is_moon_up = is_moon_up;
        this.is_sun_up = is_sun_up;
    }
}