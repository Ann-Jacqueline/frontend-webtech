/**
 * Unit-Tests für die WeatherInfo-Komponente.
 *
 * Diese Testklasse überprüft die korrekte Anzeige der Wetterinformationen
 * in der WeatherInfo-Komponente. Es verwendet Vue Test Utils zum Mounten der
 * Komponente und Vuex für das State-Management.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore, type Store } from 'vuex';
import WeatherInfo from '@/components/WeatherInfo.vue';

describe('WeatherInfo', () => {
    let store: Store<any>;

    /**
     * Richtet den Vuex-Store mit dem Anfangszustand und den Gettern vor jedem Testfall ein.
     * Setzt alle Mock-Funktionen mit vi.resetAllMocks() zurück.
     */
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
    /**
     * Testet, ob die Wetterinformationen korrekt angezeigt werden.
     */
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
    /**
     * Testet, ob 'N/A' angezeigt wird, wenn Daten fehlen.
     */
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
