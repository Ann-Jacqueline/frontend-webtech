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

    it('does not navigate when login fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const wrapper = shallowMount(WeatherStartPage, {
            global: {
                plugins: [router, store]
            }
        });
        wrapper.vm.userName = 'InvalidUser';

        // Mock a failure in the request
        vi.mocked(axios.post).mockRejectedValueOnce('Login failed');

        await wrapper.vm.navigateToWeather();
        await flushPromises();

        // Check that no navigation has taken place
        expect(router.push).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith('Error during login or fetching user:',('Login failed'));

        consoleSpy.mockRestore(); // Ensure the spy is cleaned up after the test
    });

    it('logs an error when login or user fetch fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const wrapper = shallowMount(WeatherStartPage, {
            global: {
                plugins: [router, store]
            }
        });
        wrapper.vm.userName = 'ErrorCase';

        // Mock an error in the login request
        vi.mocked(axios.post).mockRejectedValueOnce('Network Error');

        await wrapper.vm.navigateToWeather();
        await flushPromises();

        // Check if the error was logged
        expect(consoleSpy).toHaveBeenCalledWith('Error during login or fetching user:', ('Network Error'));

        consoleSpy.mockRestore(); // Ensure the spy is cleaned up after the test
    });

    it('navigates to weather page on successful login', async () => {
        const wrapper = shallowMount(WeatherStartPage, {
            global: {
                plugins: [router, store]
            }
        });
        wrapper.vm.userName = 'Jane Doe';

        // Mock successful axios responses
        vi.mocked(axios.post).mockResolvedValueOnce({ status: 201 });
        vi.mocked(axios.get).mockResolvedValueOnce({ data: { userName: 'Jane Doe' } });

        await wrapper.vm.navigateToWeather();
        await flushPromises();

        // Check if the correct methods were called
        expect(router.push).toHaveBeenCalledWith('/weather');
        expect(store.dispatch).toHaveBeenCalledWith('setUser', 'Jane Doe');
    });
});
