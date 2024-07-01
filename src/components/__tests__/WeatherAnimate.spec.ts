/**
 * Unit-Tests für die WeatherAnimate-Komponente.
 *
 * Diese Testklasse überprüft das korrekte Rendering der WeatherAnimate-Komponente
 * basierend auf verschiedenen Wetterbedingungen und Fehlerzuständen. Es verwendet Vue Test Utils
 * zum Mounten der Komponente und Vuex für das State-Management.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore, type Store } from 'vuex';
import WeatherAnimate from '@/components/WeatherAnimate.vue';

describe('WeatherAnimate', () => {
    let store: Store<any>;
    /**
     * Richtet den Vuex-Store mit dem Anfangszustand und den Gettern vor jedem Testfall ein.
     * Setzt alle Mock-Funktionen mit vi.resetAllMocks() zurück.
     */
    beforeEach(() => {
        store = createStore({
            state: {
                weatherData: {
                    info: ''
                },
                isError: false
            },
            getters: {
                getWeatherMain: (state) => state.weatherData,
                getError: (state) => state.isError
            }
        });

        vi.resetAllMocks();
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Rain' rendert.
     */
    it('renders correct class for Rain', async () => {
        store.state.weatherData.info = 'Rain';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-rain');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Drizzle' rendert.
     */

    it('renders correct class for Drizzle', async () => {
        store.state.weatherData.info = 'Drizzle';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-rain');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Snow' rendert.
     */

    it('renders correct class for Snow', async () => {
        store.state.weatherData.info = 'Snow';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-snow');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Clear' rendert.
     */

    it('renders correct class for Clear', async () => {
        store.state.weatherData.info = 'Clear';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-clear');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Clouds' rendert.
     */
    it('renders correct class for Clouds', async () => {
        store.state.weatherData.info = 'Clouds';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-clouds');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Mist' rendert.
     */
    it('renders correct class for Mist', async () => {
        store.state.weatherData.info = 'Mist';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-mist');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für die Wetterbedingung 'Thunderstorm' rendert.
     */

    it('renders correct class for Thunderstorm', async () => {
        store.state.weatherData.info = 'Thunderstorm';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-thunder');
    });
    /**
     * Testet, ob die Komponente die korrekte Klasse für den Fehlerzustand rendert.
     */
    it('renders correct class for error', async () => {
        store.state.isError = true;
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('error');
    });
});
