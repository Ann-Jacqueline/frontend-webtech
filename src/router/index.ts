/**
 * Dieses Vue-Router-Konfigurationsskript definiert die Routen für eine Wetteranwendungs-Webseite.
 * Es verwendet Vue Router für die Navigation zwischen verschiedenen Ansichten oder Seiten.
 *
 * <p>Es gibt drei Hauptansichten:
 * - Die Startseite ("/"), die login Seite zeigt.
 * - Die Wetteransicht ("/weather"), die detaillierte Wetterinformationen für eine Stadt anzeigt.
 * - Die Benutzerkontoverwaltung ("/account"), die die Benutzereinstellungen und Kontoinformationen verwaltet.
 */
import { createRouter, createWebHistory } from 'vue-router';
import WeatherEntry from '@/views/WeatherEntry.vue';
import UserAccount from '@/views/WeatherAccountManager.vue';
import WeatherStartPage from '@/views/WeatherStartPage.vue';

/**
 * Erstellung des Router-Objekts mit den definierten Routen.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WeatherStartPage
    },
    {
      path: '/weather',
      name: 'Weather',
      component: WeatherEntry
    },
    {
      path: '/account',
      name: 'Account',
      component: UserAccount
    },
  ]
});

/**
 * Exportieren des erstellten Router-Objekts für die Verwendung in der Hauptanwendung.
 */
export default router;

