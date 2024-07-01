import { describe, it, expect, beforeEach, vi } from 'vitest';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { createStore, type Store } from 'vuex';
import axios from 'axios';
import WeatherStartPage from '@/components/WeatherStartPage.vue';

// Mock axios
vi.mock('axios');

describe('WeatherStartPage', () => {
    let store: Store<any>; // Korrekter Typ
    let router: Router;   // Korrekter Typ

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

    it('initializes with an empty userName on mount', async () => {
        const wrapper = shallowMount(WeatherStartPage, {
            global: {
                plugins: [router, store]
            }
        });
        expect(wrapper.vm.userName).toBe('');
    });

});
