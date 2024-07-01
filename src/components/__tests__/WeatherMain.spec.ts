/**
 * Unit-Tests für die WeatherMain-Komponente.
 *
 * <p>Diese Testklasse überprüft das korrekte Initialisieren der WeatherMain-Komponente
 * mit Wetterdaten und das Umschalten der Sichtbarkeit des Dropdown-Menüs. Es verwendet
 * Vue Test Utils zum Mounten der Komponente und Vuex für das State-Management.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore, type Store } from 'vuex';
import WeatherMain from '@/components/WeatherMain.vue';

describe('WeatherMain', () => {
    let store: Store<any>;
    /**
     * Richtet den Vuex-Store mit dem Anfangszustand, den Gettern und den Mutationen vor jedem Testfall ein.
     * Setzt alle Mock-Funktionen mit vi.resetAllMocks() zurück.
     */
    beforeEach(() => {
        store = createStore({
            state: {
                weatherData: {
                    temp: 25,
                    feelsLike: 27,
                    description: 'clear sky',
                    icon: '01d',
                    info: 'Clear'
                },
                tempUnit: 'C',
                tempUnitStored: 'C'
            },
            getters: {
                getWeatherMain: (state) => state.weatherData,
                getTempUnit: (state) => state.tempUnit
            },
            mutations: {
                TOGGLE_TEMP_UNIT: (state, unit) => {
                    state.tempUnit = unit;
                }
            }
        });

        vi.resetAllMocks();
    });
    /**
     * Testet, ob die Komponente mit den korrekten Wetterdaten initialisiert wird.
     */
    it('initializes with correct weather data', () => {
        const wrapper = shallowMount(WeatherMain, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-description').text()).toBe('clear sky');
        expect(wrapper.find('.weather-feelsLike strong').text()).toContain('27');
        expect(wrapper.find('.weather-temp span').text()).toContain('25');
    });
    /**
     * Testet das Umschalten der Sichtbarkeit des Dropdown-Menüs.
     */
    it('toggles dropdown visibility', async () => {
        const wrapper = shallowMount(WeatherMain, {
            global: {
                plugins: [store]
            }
        });

        const dropdown = wrapper.find('.settings-dropdown ul');

        expect(dropdown.exists()).toBe(false);

        await wrapper.find('.bi-gear-fill').trigger('click');
        expect(wrapper.find('.settings-dropdown ul').exists()).toBe(true);

        await wrapper.find('.bi-gear-fill').trigger('click');
        expect(wrapper.find('.settings-dropdown ul').exists()).toBe(false);
    });
});
