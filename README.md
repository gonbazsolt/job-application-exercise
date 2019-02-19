# Megoldandó feladat
**Ügyfelünk könyvesboltot üzemeltet a belvárosban. Mivel elég sokat tartózkodik külföldön – Seychelle-szigetek -, ilyenkor is szeretné ellenőrizni üzletének mindennapjait. Ehhez kért tőlünk segítséget.**

Architektjeink Node.js + Angular alkalmazást álmodtak meg, amely az alábbi kritériumoknak kell, hogy megfeleljen:

- Teljes értékű könyvnyilvántartást valósítson meg
  - adatok: szerző*, cím*, kategória*, kiadási év*, leírás
  - funkciók
    -	listázás szűréssel (szabadszöveges: szerző és cím, lenyíló lista: kategória, egész szám: év), eredmény listában látszódjanak az alapadatok, és az aktuális készlet is.
    -	új könyv felvitele
    -	meglévő könyv módosítása
    -	könyv törlése (referenciális integritásra figyelni kell a készlet kapcsán)
- Készletnyilvántartás
  - adatok: melyik könyv*, mikor*, mozgásnem (K - eladás,B -  bevételezés), mennyiség*
  -	funkciók
    -	egy adott könyvből tudjunk bevételezni adott mennyiséget, ami növeli a készletet
    -	egy adott könyvet el tudjunk adni, ami csökkentse a készletet
    -	tranzakciók listázása. A listában jelenjen meg időrendben visszafelé, a könyvek készletváltozása.
- Adat felvitelkori ellenőrzések:
  - kötelező (*-gal jelőlt mezők) mezők megadása legyen kötelező
  - ha nincs készleten egy könyv, akkor ne lehessen eladni
  - csak akkor törölhető egy könyv, ha még egyetlen tranzakció sem létezik hozzá
-	Szükséges egy WebAPI hívás is, amin keresztül a megrendelő mobiltelefonjára külön fejlesztett alkalmazás JSON formátumban le tudja kérni egy adott évben kiadott könyvek adatait. A válaszban a könyv minden adata legyen benne a készlet kivételével.
- Használandó egyéb technológiák:
  - Boostrap v4.x (https://getbootstrap.com)
