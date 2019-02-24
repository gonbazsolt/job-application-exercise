# Alkalmazás indítása

1. clone repo (pl: VisualStudioCode-ban): git clone https://github.com/gonbazsolt/job-application-exercise.git
2. install dependencies:
```
- cd job-application-exercise/Bookstore
- npm i
```
3. elindítani az alkalmazás részeit, 3 külön terminálban:
```
- cd Bookstore/Backend
- nodemon server.js (web backend)
- cd Bookstore
- json-server --watch db.json (Mock DB)
- cd Bookstore
- ng serve -o (Angular frontend)
```

###### Megjegyzés

Sajnos a web backend újraindítása nélkül a 'Módosítás' és 'Törlés' - a könyvek karbantartása - listái nem frissülnek, ezért a felvitel, módosítás és törlés esetén a backend szerver fájl újraindítása szükséges. A 'Listázás'-t a backend kihagyásával, egyenesen a mock adatbázis elérésével írtam meg - ezért szükséges elindítani a JSON server-t is -, az dinamikusan változik minden funkciónál.
