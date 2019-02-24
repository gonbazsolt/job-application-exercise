# Tartalomjegyzék

## routeHandler.js

A backend szerver ebben a fájlban kezeli a különböző endpointokhoz tartozó fájlokat. A routes mappában találhatóak a fájlok, és azokban van deklarálva az egyes endpointok GET, POST, PUT, DELETE Http requestekre adandó válasz.

## server.js

Ez maga a lecsupaszított szerver. Ezt kell elindítani, de tulajdonképpen csak a megfelelő portot "hallgatja" , minden más ki van szervezve különálló fájlokba.

## stockManager.js

Ez egy OOP jellegű fájl. A fő üzleti - magát a készletezést - logikát kezelem benne.

###### Megjegyzés

Ugyan a frontenden lekezelem a kérések hibáit, elméletileg a szerver már csak validált és feldolgozható adatokat kaphat, de azért a szerver oldalra is írtam error handlinget. Ezt legegyszerűbben valamilyen egyéb alkalmazással lehet tesztelni, én a Postman-t használtam erre.
