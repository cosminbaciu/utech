## Introducere 


Aplicatia noastra consta intr-o platforma integrata cu Youtube, in care este posibila cautarea videoclipurilor, crearea propriului playlist si ofera si o lista de clipuri favorite.

Aceastra aplicatie se adreseaza tuturor persoanelor care obisnuiesc sa aceeseze platforma Youtube, insa crearea si editarea playlist-ului poate fi facuta numai de catre cei care detin un cont de utilizator. 
Fiecare utilizator isi va creea un cont si va avea parte de un content personalizat.
Initial utilizatorul se poate loga (daca are deja cont) sau se inregistreaza in vederea crearii unui cont.
Fiecare utilizator isi poate adauga in propriul playlist o colectie de videclipuri favorite; acestea putand fi partajate prietenilor si accesate de catre acestia prin solicitarea de acces in cazul playlist-urilor private. 

Nu in ultimul rand, trebuie mentionat faptul ca aplicatia noastra nu poate fi utilizata fara accesul unei retele Wi-fi, ori utilizarea de date mobile.
Youtube este una dintre cele mai utile aplicatii datorita posibilitatii de a aceesa videoclipuri oriunde te-ai afla. Alte produse similar pe piata putem enumera: Spotify, ITube, Apple Music, BlackPlayer,etc. 

Pentru partea de backend am ales sa utilizam Java Springboot si Maven.
Pentru a creea aceasta aplicatie vom folosi librariile com.google.api-client si com.google.goolge-api-services.
Totodata, pentru a folosi API-ul Youtube-v3, am obtinut un API-key de pe https://developers.google.com/youtube pe care il includem in fisierul de proprietati.

## Mock-ups

![alt text](https://raw.githubusercontent.com/cosminbaciu/utech/mock-ups/mock1.png "Logo Title Text 1")
      
      
https://raw.githubusercontent.com/andreeabadea/utech/mock-ups/mock2.png

## Interfețe aplicație

/api/search (String keyword)
/api/getFavouriteVideos
/api/addVideoToFavourite (Video video)
/api/createUser (User user)
/api/logIn(String username, String password, String token)
/api/deleteVideoFromFavourite/:id (Long id)
/api/getVideo/:id (Long id)
/api/updateVideo/:id


## API REST



```
GET : /api/account
```


```json
{
"id": 1,
"username": "string",
"firstName": "string",
"lastName": "string",
"email": "string@string.com",
"activated": true,
"createdDate": "2018-10-24T11:43:44.431638Z"
}
```

```
POST : /api/account
```


Request :

```JSON
{
"username": "string",
"firstName": "string",
"lastName": "string",
"email": "string@string.com",
"createdDate": "2018-10-24T11:43:44.431638Z",
"password" : "string"
}
```

Response: 201 (Created)

```
PUT : /api/account/{id}
```

Request :

```JSON
{
"username": "string",
"firstName": "string",
"lastName": "string",
"email": "string@string.com",
"createdDate": "2018-10-24T11:43:44.431638Z",
"password" : "string"
}
```

Response: 201 (Created)

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

```
GET : /api/search/{keyword}
```

Response:

```JSON
[
{
"videoId" : Long,
"title": string,
"thumbnail" , string
}
]

```


```
GET : /api/getFavouriteVideos
```

Response:

```JSON
[
{
"videoId" : Long,
"title": string,
"thumbnail" , string
}
]
```


```
GET : /api/getFavouriteVideos/{id}
```

Response

```JSON
{
"videoId" : Long,
"title": string,
"thumbnail" , string
}
```

```
POST : /api/addVideoToFavourite
```

Request:

```JSON
{
"videoId" : long,
"title": string,
"thumbnail" , string
}
```

Response : 201 (Created)

```
DELETE: /api/deleteVideoFromFavourite/{id}
```

Response: 200 (ok)
