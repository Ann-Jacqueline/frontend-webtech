import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore, type Store } from 'vuex';
import WeatherInfo from '@/components/WeatherInfo.vue';

describe('WeatherInfo', () => {
    let store: Store<any>;

    beforeEach(() => {
        store = createStore({
            state: {
                weatherData: {
                    wind: { speed: 5 },
                    humidity: 70,
                    clouds: { all: 50 }
                }
            },
            getters: {
                getWeatherInfo: (state) => ({
                    windSpeed: state.weatherData.wind ? state.weatherData.wind.speed.toFixed(2) + ' m/s' : 'N/A',
                    clouds: state.weatherData.clouds ? state.weatherData.clouds.all + '%' : 'N/A',
                    humidity: state.weatherData.humidity ? state.weatherData.humidity + '%' : 'N/A'
                })
            }
        });

        vi.resetAllMocks();
    });

    it('displays weather information correctly', () => {
        const wrapper = shallowMount(WeatherInfo, {
            global: {
                plugins: [store]
            }
        });

        const windSpeed = wrapper.find('.weather-item[title="Wind speed"] .value');
        const humidity = wrapper.find('.weather-item[title="Humidity"] .value');
        const clouds = wrapper.find('.weather-item[title="Cloudiness"] .value');

        expect(windSpeed.text()).toBe('5.00 m/s');
        expect(humidity.text()).toBe('70%');
        expect(clouds.text()).toBe('50%');
    });

    it('displays N/A if data is missing', async () => {
        store.state.weatherData = {};

        const wrapper = shallowMount(WeatherInfo, {
            global: {
                plugins: [store]
            }
        });

        const windSpeed = wrapper.find('.weather-item[title="Wind speed"] .value');
        const humidity = wrapper.find('.weather-item[title="Humidity"] .value');
        const clouds = wrapper.find('.weather-item[title="Cloudiness"] .value');

        expect(windSpeed.text()).toBe('N/A');
        expect(humidity.text()).toBe('N/A');
        expect(clouds.text()).toBe('N/A');
    });
});
