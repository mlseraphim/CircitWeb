import axios from 'axios';
import { useAppDispatch } from './StoreHooks';
import { setDataLoading, setAppError, resetAppError } from './AppVarsReducer';
import { EnumApiMethod } from '../Infrastructure/Enums';
import { IApiRequest, IApiResponse, IAstronomyInfo, ITimezoneInfo, IWeatherInfo } from '../Infrastructure/Interfaces';
import { AstronomyInfo, TimezoneInfo, WeatherInfo } from '../Infrastructure/Classes';


export const useApiCaller = () => {
    const dispatch = useAppDispatch();


    /* ***** WEATHER ***** */
    const weather_Get = async (cityName: string): Promise<WeatherInfo> => {
        let result: WeatherInfo;

        return await GetApiCall(`weather?cityName=${ cityName }`).then((response: IWeatherInfo) => {
            if (response !== null) {
                result = new WeatherInfo(
                    response.current.last_updated_epoch,
                    response.current.last_updated,
                    response.current.temp_c,
                    response.current.temp_f,
                    response.current.is_day,
                    response.current.condition,
                    response.current.wind_mph,
                    response.current.wind_kph,
                    response.current.wind_degree,
                    response.current.wind_dir,
                    response.current.pressure_mb,
                    response.current.pressure_in,
                    response.current.precip_mm,
                    response.current.precip_in,
                    response.current.humidity,
                    response.current.cloud,
                    response.current.feelslike_c,
                    response.current.feelslike_f,
                    response.current.vis_km,
                    response.current.vis_miles,
                    response.current.uv,
                    response.current.gust_mph,
                    response.current.gust_kph
                );
            }

            return result;
        });
    };

    const timezone_Get = async (cityName: string): Promise<TimezoneInfo> => {
        let result: TimezoneInfo;

        return await GetApiCall(`timezone?cityName=${ cityName }`).then((response: ITimezoneInfo) => {
            if (response !== null) {
                result = new TimezoneInfo(
                    response.location.name,
                    response.location.region,
                    response.location.country,
                    response.location.lat,
                    response.location.lon,
                    response.location.tz_id,
                    response.location.localtime_epoch,
                    response.location.localtime
                );
            }

            return result;
        });
    };

    const astronomy_Get = async (cityName: string): Promise<AstronomyInfo> => {
        let result: AstronomyInfo;

        return await GetApiCall(`astronomy?cityName=${ cityName }`).then((response: IAstronomyInfo) => {
            if (response !== null) {
                result = new AstronomyInfo(
                    response.astronomy.astro.sunrise,
                    response.astronomy.astro.sunset,
                    response.astronomy.astro.moonrise,
                    response.astronomy.astro.moonset,
                    response.astronomy.astro.moon_phase,
                    response.astronomy.astro.moon_illumination,
                    response.astronomy.astro.is_moon_up,
                    response.astronomy.astro.is_sun_up
                );
            }

            return result;
        });
    };
    /* ***** WEATHER ***** */




    /* ***** PRIVATE METHODS ***** */
    const GetApiCall = async (url: string) => {
        const params: IApiRequest = {
            Method: EnumApiMethod.GET,
            Url: url
        };

        return CallApiCall(params);
    };

    const CallApiCall = async (params: IApiRequest) => {
        dispatch(setDataLoading(true));

        const result: Promise<IApiResponse> = await ApiCall(params);

        dispatch(setDataLoading(false));

        if ((await result).SuccessResponse) {
            return (await result).SuccessResponse;
        }
        else {
            return null;
        }
    };

    const ApiCall = async(params: IApiRequest): Promise<any> => {
        dispatch(resetAppError());

        const BaseUrl: string = process.env.REACT_APP_API_BASE_URL as string;
        
        let headers = {
            ...params.Headers,
            'Content-Type': 'application/json'
        };

        return await axios({
            method: params.Method,
            url: BaseUrl + params.Url,
            data: params.Data,
            headers: headers
        })
        .then(response => {
            if (response.data < 0) {
                handleUpdateError(response.data);
            }
            else {
                const result: IApiResponse = {
                    SuccessResponse: response.data
                };
                
                return result;
            }
        })
        .catch(error => {
            let errorMessage: string = '';
            let errorData: any = {};
            let responseStatus: string = '';
            
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Please sign in to continue using the website';
                }
                else {
                    errorMessage = 'The server replied with a non-success response';
                }
            }
            else if (error.request) {
                errorMessage = 'No response was received from the server';
            }
            else {
                errorMessage = 'An internal error occured when sending the request to the server';
            }
            
            if (error.response) {
                responseStatus = error.response.status;
                errorData = error.response.data;
            }
            
            const result: IApiResponse = {
                ErrorResponse: {
                    HasError: true,
                    Message: errorMessage,
                    Data: errorData,
                    Status: responseStatus
                }
            };
            
            dispatch(setAppError(result.ErrorResponse));
            
            return result;
        });
    };

    const handleUpdateError = (responseData: number) => {
        let errorMessage: string = '';

        switch(responseData) {
            case -100:
                errorMessage = 'Error code 100';
            break;
        }

        const result: IApiResponse = {
            ErrorResponse: {
                HasError: true,
                Message: errorMessage
            }
        };

        dispatch(setAppError(result.ErrorResponse));

        return result;

    };
    /* ***** PRIVATE METHODS ***** */


    return {
        Weather_Get: weather_Get,
        Timezone_Get: timezone_Get,
        Astronomy_Get: astronomy_Get
    };
};

export default useApiCaller;