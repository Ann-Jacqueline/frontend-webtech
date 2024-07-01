Frontend teil der WeatherWorks Wetter App.
Die Datenverwaltung läuft einmal mit einer eigenen Zustandsverwaltung dem store.ts und dem Backend durch axios Aufrufe
Die App Hat 4 Base Komponenten die Sich um die Optik und Wetterdatenbereitstellung kümmern: 
WeatherSearch kümmert sich um die Suchfunktionalität
WeatherInfo: kümmert sich um Basis Infos wie die Windgeschwindigkeit, Luftfeuchtigkeit und wie bewölkt es ist
WeatherAnimate: kümmert sich um die Animationen der App die mit den wetterdaten korrespondiert
WeatherMain: Kümmert sich um die Detaillieren Wetter infos wie der Temperatur und weitern Wetterdaten

Die Haupt Komponenten
WeatherEntry, WeatherStartpage und WeatherAccountManager sind die Haupt views der App und zeigen Die login Seite, Die Mainpage und die User Account Seite und binden die 
Basis Komponenten ein

Credential Handling: Der Schlüssel zu der API ist in beiden Environments verschlüsselt und der Schlüssel würde auf render 
hinterlegt.