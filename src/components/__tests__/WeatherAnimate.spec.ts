import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore, type Store } from 'vuex';
import WeatherAnimate from '@/components/WeatherAnimate.vue';

describe('WeatherAnimate', () => {
    let store: Store<any>;

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

    it('renders correct class for Rain', async () => {
        store.state.weatherData.info = 'Rain';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-rain');
    });

    it('renders correct class for Drizzle', async () => {
        store.state.weatherData.info = 'Drizzle';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-rain');
    });

    it('renders correct class for Snow', async () => {
        store.state.weatherData.info = 'Snow';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-snow');
    });

    it('renders correct class for Clear', async () => {
        store.state.weatherData.info = 'Clear';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-clear');
    });

    it('renders correct class for Clouds', async () => {
        store.state.weatherData.info = 'Clouds';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-clouds');
    });

    it('renders correct class for Mist', async () => {
        store.state.weatherData.info = 'Mist';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-mist');
    });

    it('renders correct class for Thunderstorm', async () => {
        store.state.weatherData.info = 'Thunderstorm';
        const wrapper = shallowMount(WeatherAnimate, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('.weather-animate').classes()).toContain('weather-thunder');
    });

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
