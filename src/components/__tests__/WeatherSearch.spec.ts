/**
 * Unit-Tests für die WeatherSearch-Komponente.
 *
 * <p>Diese Testklasse überprüft das korrekte Initialisieren der WeatherSearch-Komponente
 * und das Aufrufen der fetchWeatherData-Aktion beim Drücken der Enter-Taste. Es verwendet
 * Vue Test Utils zum Mounten der Komponente und Vuex für das State-Management.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { createStore, type Store } from 'vuex';
import WeatherSearch from '@/components/WeatherSearch.vue';

describe('WeatherSearch', () => {
    let store: Store<any>;
    /**
     * Richtet den Vuex-Store mit dem Anfangszustand, den Gettern und den Aktionen vor jedem Testfall ein.
     * Setzt alle Mock-Funktionen mit vi.resetAllMocks() zurück und überwacht store.dispatch.
     */

    beforeEach(() => {
        store = createStore({
            state: {
                search: '',
                weatherData: { country: 'DE' },
                isError: false,
                timezone: 3600,
                weatherCountry: 'DE'
            },
            getters: {
                isSearched: (state) => state.search !== '',
                getWeatherCountry: (state) => state.weatherCountry,
                getError: (state) => state.isError,
                getTimezone: (state) => state.timezone
            },
            actions: {
                fetchWeatherData: vi.fn(() => Promise.resolve())
            }
        });

        // Reset all mocks before each test
        vi.resetAllMocks();

        // Spy on store.dispatch
        vi.spyOn(store, 'dispatch');
    });
    /**
     * Testet, ob die Komponente mit einem leeren Suchfeld initialisiert wird.
     */
    it('initializes with an empty search on mount', () => {
        const wrapper = shallowMount(WeatherSearch, {
            global: {
                plugins: [store]
            }
        });
        expect(wrapper.vm.search).toBe('');
    });
    /**
     * Testet, ob fetchWeatherData beim Drücken der Enter-Taste aufgerufen wird.
     */
    it('calls fetchWeatherData on enter key press', async () => {
        const wrapper = shallowMount(WeatherSearch, {
            global: {
                plugins: [store]
            }
        });

        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        const searchInput = wrapper.find('input');
        await searchInput.setValue('Berlin');
        await searchInput.trigger('keydown.enter');
        await flushPromises();

        expect(store.dispatch).toHaveBeenCalledWith('fetchWeatherData', 'Berlin');
        expect(consoleSpy).toHaveBeenCalledWith('Wetterdaten erfolgreich geladen für:', 'Berlin');

        consoleSpy.mockRestore(); // Ensure the spy is cleaned up after the test
    });

});
