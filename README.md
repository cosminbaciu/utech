## Introducere 


Aplicatia noastra consta intr-o platforma integrata cu Youtube, in care este posibila cautarea videoclipurilor, crearea propriului playlist si ofera si o lista de clipuri favorite.

Aceastra aplicatie se adreseaza tuturor persoanelor care obisnuiesc sa aceeseze platforma Youtube, insa crearea si editarea playlist-ului poate fi facuta numai de catre cei care detin un cont de utilizator. 
Fiecare utilizator isi va creea un cont si va avea parte de un content personalizat.
Initial utilizatorul se poate loga (daca are deja cont) sau se inregistreaza in vederea crearii unui cont.
Fiecare utilizator isi poate adauga in propriul playlist o colectie de videclipuri favorite; acestea putand fi partajate prietenilor si accesate de catre acestia prin solicitarea de acces in cazul playlist-urilor private. 

Nu in ultimul rand, trebuie mentionat faptul ca aplicatia noastra nu poate fi utilizata fara accesul unei retele Wi-fi, ori utilizarea de date mobile.
Youtube este una dintre cele mai utile aplicatii datorita posibilitatii de a aceesa videoclipuri oriunde te-ai afla. Alte produse similar pe piata putem enumera: Spotify, ITube, Apple Music, BlackPlayer,etc. 

Pentru partea de backend am ales sa utilizam Java Springboot si Maven, iar pentru baza de date PostgreSQL.
Pentru a creea aceasta aplicatie vom folosi librariile com.google.api-client si com.google.goolge-api-services.
Totodata, pentru a folosi API-ul Youtube-v3, am obtinut un API-key de pe https://developers.google.com/youtube pe care il includem in fisierul de proprietati.

            


## Interfețe aplicație

![1](https://github.com/cosminbaciu/utech/blob/master/mock-ups/mock1.jpg)

![2](https://github.com/cosminbaciu/utech/blob/master/mock-ups/mock2.jpg)




```
POST: /api/register/register
```

```
POST : /api/register/change-password
```

```
GET : /api/admin/all
```

```
GET : /api/security/users
```

```
GET : /api/security/roles
```

```
GET : /api/security/permissions
```

```
POST : /api/security/roles
```

```
POST : /api/security/permissions
```

```
GET : /api/me
```

```
GET : /api/userRegistered/{email}
```

```
GET : /api/youtube/search/{keyword}
```

```
GET : /api/youtube/searchHistory
```

```
GET : /api/favourites/getAllFavouritesVideos
```

```
GET : /api/favourites/getAllSeenVideos
```

```
POST : /api/favourites/addToFavourite
```

```
POST : /api/favourites/addViewForVideo
```

```
POST: /playlist/addVideo/{playlistId}/{videoId}
```

```
DELETE: /playlist/deleteVideo/{playlistId}/{videoId}
```


Components:

```
Login form
```
```
Register form
```
```
User details
```
```
Video search
```
```
Favourite video list
```
```
All video list
```
```
Add seen to a video
```

```
Playlist
```

User actions:

```
Login
```
```
Register
```
```
Update personal details
```
```
Search video by keyword
```
```
Update favourite video list
```
```
Get favourite video list
```
```
Get all videos list
```
```
Create playlist
```
```
Delete playlist
```
```
Update playlist
```
```
Add video in playlist
```
```
Delete video from playlist
```



## API REST


```
POST: /api/login
```

```JSON
{
   "username":"string",
   "password":"string"
}
```
---
---

```
POST : /api/register/register
```

Request:

```JSON
{
  "email": "string@string.com",
  "id": 0,
  "username" : "string",
  "password" : "string"
  
}
```
Response: 201 (Created)

---
---

```
POST : /api/account/change-password
```


Request:

```JSON
{
"oldPassword" : "string",
"newPassword" : "string"
}
```

Response: 200 (ok)

---
---

```
GET : /api/youtube/search/{keyword}
```

Response:

```JSON
[
{
"videoId" : "long",
"title": "string",
"thumbnail" : "string"
}
]

```
---
---
```
GET: /api/youtube/searchHistory
```

Response:
```JSON
[
  {
    "createdAt": "2018-12-09T12:52:14.319Z",
    "id": 0,
    "keyword": "string",
    "updatedAt": "2018-12-09T12:52:14.319Z",
    "userId": 0
  }
]
```

---
---

```
GET : /api/favourites/getAllFavouriteVideos
```

Response:

```JSON
[
  {
    "createdAt": "2018-12-09T12:52:14.301Z",
    "favouriteFlag": true,
    "id": 0,
    "thumbnailUrl": "string",
    "title": "string",
    "updatedAt": "2018-12-09T12:52:14.301Z",
    "userId": 0,
    "videoId": "string",
    "views": 0
  }
]
```

---
---

```
GET : /api/favourites/getAllSeenVideos
```

Response:

```JSON
[
  {
    "createdAt": "2018-12-09T12:52:14.301Z",
    "favouriteFlag": true,
    "id": 0,
    "thumbnailUrl": "string",
    "title": "string",
    "updatedAt": "2018-12-09T12:52:14.301Z",
    "userId": 0,
    "videoId": "string",
    "views": 0
  }
]
```
---
---

```
POST : /api/favourites/addToFavourite
```

Request:

```JSON
{
"videoId" : "long",
"title": "string",
"thumbnail": "string"
}
```

Response : 201 (Created)

---
---


```
POST : /api/favourites/addViewForVideo
```

Request:

```JSON
{
"videoId" : "long",
"title": "string",
"thumbnail": "string"
}
```

Response : 201 (Created)

```JSON
{
  "createdAt": "2018-12-09T12:52:14.293Z",
  "favouriteFlag": true,
  "id": 0,
  "thumbnailUrl": "string",
  "title": "string",
  "updatedAt": "2018-12-09T12:52:14.293Z",
  "userId": 0,
  "videoId": "string",
  "views": 0
}
```
---
---

```
POST: /api/playlist/create
```
Request:

```JSON
{
  "createdAt": "2018-12-09T16:42:24.199Z",
  "genre": "string",
  "id": 0,
  "name": "string",
  "updatedAt": "2018-12-09T16:42:24.199Z"
}
```

Response: 201(Created)

---
---

```
PUT: /api/playlist/update/{id}
```
Request:

Long id +
```JSON
{
  "createdAt": "2018-12-09T16:42:24.199Z",
  "genre": "string",
  "id": 0,
  "name": "string",
  "updatedAt": "2018-12-09T16:42:24.199Z"
}
```

Response: 201(Created)

---
---
```
GET: /api/playlist/getAll
```

Response: 200(OK)

```JSON
[
  {
    "createdAt": "2018-12-09T16:42:24.204Z",
    "genre": "string",
    "id": 0,
    "name": "string",
    "updatedAt": "2018-12-09T16:42:24.204Z"
  }
]
```
---
---

```
DELETE: /api/playlist/delete/{id}
```
Request: Long id

Response: 200(OK)

---
---

```
POST: /playlist/addVideo/{playlistId}/{videoId}
```

Request: Long playlistId, Long videoId

Response: 201(Created)

```JSON
{
  "createdAt": "2018-12-09T17:56:32.220Z",
  "favouriteVideoId": 0,
  "id": 0,
  "playlistId": 0,
  "updatedAt": "2018-12-09T17:56:32.220Z"
}
```
---
---

```
DELETE: /playlist/deleteVideo/{playlistId}/{videoId}
```

Request: Long playlistId, Long videoId

Response: 200(OK)

---
---



# Configurare mediu de lucru


### Tools

1. Maven 3.0+ 
2. Un IDE (noi am folosit IntelliJ)
3. JDK 1.8+

### Instalare JDK


```
$ sudo apt update
```

Verificam daca java este deja instalat:

```
$ java -version
```

Daca rezultatul este negativ, instalam JRE

```
$ sudo apt install openjdk-8-jre
```
si verificam iar daca este s-a instalat:

```
$ java -version
```

Daca vedem urmatorul output:

```
Output
openjdk version "1.8.0_162"
OpenJDK Runtime Environment (build 1.8.0_162-8u162-b12-1-b12)
OpenJDK 64-Bit Server VM (build 25.162-b12, mixed mode)
```
     
Continuam cu instalarea JDK-ului:

```
$ sudo apt install openjdk-8-jdk
```

Cele mai multe programe java utilizeaza variabila de mediu JAVA_HOME astfel incat trebuie setata. 


```
$ sudo update-alternatives --config java
```

Mai intai trebuie sa vedem unde este instalat. In tabel cautam /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java:

---
Deschidem fisierul /etc/environment 


```
$ sudo nano /etc/environment
```

La sfarsitul fisierului inlocuim calea cu cea determinata mai sus:

```
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/bin/"
```

Reincarcam fisierul:
```
$ source /etc/environment
```

Verificam daca modificarea a avut loc
```
$ echo $JAVA_HOME
```

Outputul trebuie sa coincida cu modificarea facuta mai sus.
```
Output
/usr/lib/jvm/java-11-openjdk-amd64/bin/
```

### Instalare Maven

```
$ sudo apt install maven
```

``` 
$ mvn -version
```


### Instalare PosttgreSQL

```
$ sudo apt-get install postgresql postgresql-contrib
```

Accesare consola psql:

```
$  sudo -u postgres psql postgres
```

Cream user pentru a accesa aplicatia:

```
postgres=#  create user cosmin with password;
```

Cream baza de date:

```
postgres=# create database utech;
```

Acordam drepturi userului creat anterior:
```
postgres=# grant all privileges on database utech to cosmin;
```

## Rulare aplicatie

Aplicatia este construita in SpringBoot si rulata cu ajutorul Maven.

Pentru a rula aplicatia, intai trebuie sa instalam dependintele

Intram in proiect, in /utech si rulam 

```
$ mvn install
```

```
$ mvn spring-boot:run
```

Cand vedem in consola de run:
```
Started UtechApplication in 6.516 seconds (JVM running for 6.944)
```
mergem in browser si accesam http://localhost:8090/api


## Navigare

In momentul in care accesam http://localhost:8090/api in browser, va aparea formularul de log in. 
Pentru a crea un user, apelam in Postman 

```POST:  http://localhost:8090/api/register/register``` cu body-ul prezentat mai sus. 
Daca raspunsul este favorabil, ne vom putea loga cu userul creat.

1. Pentru a vizualiza si a utiliza mai bine aplicatia, avand doar partea de back-end, am folosit un tool numit Swagger. 
Acesta poate fi accesat, in sesiunea userului curent, la adresa ```http://localhost:8090/api/swagger-ui.html```

Acolo regasim fiecare endpoint cu o interfata mai facila pentru utilizator, cu sugestii de body-uri si autocomplete cu date mock pentru request-uri.

2. O alternativa este apelarea endpoint-urilor direct din terminal, cu ```curl```, cu mentiunea ca trebuie sa adaugam autorizare.

Exemplu: 
```
curl --user cosmin:Fepece1905 -X GET --header 'Accept: application/json' 'http://localhost:8090/api/playlist/getAll'
```

3. Call-uri in aplicatie se pot face si cu ajutorul lui Postman.


##Schema bazei de date

![3](https://github.com/cosminbaciu/utech/blob/master/mock-ups/db_schema)



## Front-end

Pentru partea de front-end am folosit limbajul React. 

Am structurat proiectul in pachetele common, components, user si util, pentru o mai buna vizualizare a fisierelor

Proiectul porneste ruland comanda

```
npm start
```

Pentru usurarea dezvoltarii componentei de UI, am folosit biblioteca Material UI care implementeaza Google Material Design.




