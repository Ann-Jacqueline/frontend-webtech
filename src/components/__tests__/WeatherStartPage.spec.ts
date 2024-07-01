/**
 * Unit-Tests für die WeatherStartPage-Komponente.
 *
 * <p>Diese Testklasse überprüft das korrekte Initialisieren der WeatherStartPage-Komponente
 * und die Interaktion mit dem Router und dem Vuex-Store. Es verwendet Vue Test Utils zum
 * Mounten der Komponente, Vue Router für das Routing und Vuex für das State-Management.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { createStore, type Store } from 'vuex';
import axios from 'axios';
import WeatherStartPage from '../../views/WeatherStartPage.vue';

// Mock axios
vi.mock('axios');

describe('WeatherStartPage', () => {
    let store: Store<any>; // Korrekter Typ
    let router: Router;   // Korrekter Typ

    /**
     * Richtet den Vuex-Store, den Router und die Routen vor jedem Testfall ein.
     * Setzt alle Mock-Funktionen mit vi.resetAllMocks() zurück und überwacht store.dispatch.
     */
    beforeEach(() => {
        store = createStore({
            actions: {
                setUser: vi.fn()
            },
            mutations: {
                SET_USER_NAME: (state, userName) => {
                    state.userName = userName;
                }
            },
            state: {
                userName: ''
            }
        });

        const routes = [
            { path: '/', name: 'Home', component: WeatherStartPage },
            { path: '/weather', name: 'Weather', component: { template: '<div>Weather</div>' } }
        ];

        router = createRouter({
            history: createWebHistory(),
            routes
        });

        // Mock router.push Methode
        router.push = vi.fn();

        // Reset all mocks before each test
        vi.resetAllMocks();

        // Spy on store.dispatch
        vi.spyOn(store, 'dispatch');
    });
    /**
     * Testet, ob die Komponente mit einem leeren Benutzernamen initialisiert wird.
     */
    it('initializes with an empty userName on mount', async () => {
        const wrapper = shallowMount(WeatherStartPage, {
            global: {
                plugins: [router, store]
            }
        });
        expect(wrapper.vm.userName).toBe('');
    });

});
