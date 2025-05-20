# PigeonApp – Projekt- och Issuehantering

PigeonApp är fontenden till en webbapplikation byggd med **React**, **TypeScript** och **Vite** för att hantera projekt, issues och medlemmar. Applikationen är framtagen som en inlämningsuppgift och har följande funktionalitet:

## Funktioner

- **Skapa projekt:** Lägg till nya projekt och ange projektmedlemmar.
- **Visa projekt:** Se en översikt över aktiva och färdiga projekt.
- **Projektvy:** Klicka på ett projekt för att se detaljer och tillhörande issues.
- **Skapa issues:** Lägg till nya issues till ett projekt med titel och beskrivning.
- **Visa issues:** Se en lista över inaktiva issues för ett projekt.
- **Klicka på ett issue** Klicka på ett inaktivt issue för att lägga till estimerad tid.
- **Visa issues:** Se en lista över aktiva issues för ett projekt.
- **Klicka på aktivissue** när issuet är klart klicka på den och lägg till den faktiska tiden.
- **Visa issues:** Se en lista över färdiga issues för ett projekt.
- **Statistik** Se statistik för färdiga projekt.
- **Navigering:** Enkel navigering mellan startsida, projektöversikt och projekt.

## Teknologier

- React 19 + TypeScript
- Vite
- React Bootstrap
- Axios (för API-anrop)
- React Router

## Kom igång

Innan du kan komma igång klona ner repot

```git clone https://github.com/hppy-squid/PigeonApp-Grupp2
   cd API-PigeonApp-grupp2
```

1. **Installera beroenden:**
   ```sh
   npm install
   ```
2. **Starta utvecklingsservern:**
   ```sh
   npm run dev
   ```
3. **Bygg för produktion:**
   ```sh
   npm run build
   ```

> Backend måste vara igång på `localhost:8080` för att API-anropen ska fungera.

Länk till API: https://github.com/hppy-squid/API-PigeonApp-grupp2

---
