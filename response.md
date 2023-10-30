# 🚢 Questionnaire sur le Titanic

## Question 1: Nombre de Passagers 🧳
```
GET /titanic_mathieu/_search
```

### Réponse
1309 passagers

---

## Question 2: Nombre de Décès et Corps Retrouvés ☠️
```
GET /titanic_ethan/_search
{
  "size": 0,
  "aggs": {
    "nombre_de_deces": {
      "filter": {
        "term": {
          "Survived": false
        }
      }
    },
    "nombre_de_corps_retrouves": {
      "filter": {
        "exists": {
          "field": "Body"
        }
      }
    }
  }
}
```
### Réponse : 
Il y a 967 décès et 130 corps ont été retrouvés.

---

## Question 3: Classe Ayant le Plus Survécu 🏋️‍♀️
```
GET /titanic_ethan/_search
{
  "size": 0,
  "aggs": {
    "classes": {
      "terms": {
        "field": "Pclass"
      },
      "aggs": {
        "survived_count": {
          "sum": {
            "field": "Survived"
          }
        }
      }
    }
  }
}

```
### Réponse : 
La classe 1 a le plus survécu.

---

## Question 4: Personnes Non Conformes à "Femmes et Enfants d'Abord" 🚹
```
GET /titanic_ethan/_search
{
  "size": 0,
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "Sex": "male"
          }
        },
        {
          "range": {
            "Age": {
              "gte": 18
            }
          }
        }
      ]
    }
  }
}
```

### Réponse: 
Il y a 576 hommes.

---

## Question 5: Application de la Règle "Femmes et Enfants d'Abord" ❌
### Réponse : 
Non, la règle n'a pas été appliquée.

---

## Question 6: Passagers en Direction de Washington DC 🛫
```
GET /titanic_ethan/_search
{
  "size": 0,
  "query": {
    "match": {
      "Destination": "Washington DC"
    }
  }
}
```

### Réponse : 
27 personnes sont parties en direction de Washington DC.

---

## Question 7: Attribution des Cabines par Ticket 🎫
```
GET /titanic_ethan/_search
{
  "_source": ["TicketInformation.Ticket","TicketInformation.Cabin"],
  "query": {
    "bool": {
      "filter": [
        {"exists": {
          "field": "TicketInformation.Cabin"
        }}
      ]
    }
  }
}
```

### Réponse : 
295 tickets ont été attribués à des cabines.

---

## Question 8: Âge Moyen des Femmes du Bateau 👩‍🦰
```
GET /titanic_ethan/_search
{
  "query": {
    "term": {
      "Sex": "female"
    }
  },
  "aggs": {
    "age_moyen_femmes": {
      "avg": {
        "field": "Age"
      }
    }
  }
}
```

### Réponse: 
L'âge moyen des femmes est de 28,6 ans.

--- 

## Question 9: Prix Moyen de la Place 💰
```
GET /titanic_ethan/_search
{
  "size": 0,
  "aggs": {
    "prix_moyen_place": {
      "avg": {
        "field": "TicketInformation.Fare"
      }
    }
  }
}
```

### Réponse : 
Le prix moyen de la place est de 33,29.

---

## Question 10: Nom de Famille par Ticket 🏷️
```
GET /titanic_ethan/_search
{
  "_source": ["Name","TicketInformation.Fare"]
}
```

### Réponse:
Ware (Fare: 1050) \
Slemen (Fare: 1050) \
Rice (Fare: 2913)\
Bonnell (Fare: 16487)\
Lundstrom (Fare: 758)\
Sobey (Fare: 1300)\
Nirva (Fare: 713)\
Watt (Fare: 1575)\
Lobb (Fare: 1610)\
Hendekovic (Fare: 790)

---

## Question 11: Prix du Trajet Entre Chaque Étape 🚢
```
GET /titanic_ethan/_search
{
  "size": 0,
  "aggs": {
    "trajets": {
      "terms": {
        "script": {
          "source": "doc['Boarded.keyword'].value + '/' + doc['Destination.keyword'].value"
        }
      },
      "aggs": {
        "prix_moyen_trajet": {
          "avg": {
            "field": "TicketInformation.Fare"
          }
        }
      }
    }
  }
}
```

### Réponse:
Southampton/New York City: 1358,86\
Southampton/New York, New York, US: 5685,65\
Cherbourg/New York, New York, US: 7893,43\
Queenstown/New York City: 845,23\
Southampton/Chicago, Illinois, US: 1085,75\
Southampton/Montreal, Quebec, Canada: 6100,18\
Southampton/Detroit, Michigan, US: 1518,56\
Cherbourg/New York City: 958,54\
Southampton/Winnipeg, Manitoba, Canada: 11496,11\
Cherbourg/Ottawa, Ontario, Canada: 1089,93\

---

## Question 12: Passagers Voyageant Ensemble Séparés dans Plusieurs Canots de Sauvetage 🛶
```
GET /titanic_ethan/_search
{
  "size": 0,
  "aggs": {
    "passagers_par_ticket": {
      "terms": {
        "field": "TicketInformation.Ticket",
        "min_doc_count": 2
      },
      "aggs": {
        "numeros_de_canot": {
          "terms": {
            "field": "Lifeboat.keyword"
          }
        }
      }
    }
  }
}
```

### Réponse : 
Il y a des passagers voyageant ensemble qui ont été séparés dans plusieurs canots de sauvetage.

--- 

## Question 13: Pays d'Origine des Passagers et Nombre de Passagers 🌍
```
GET /titanic_ethan/_search
{
  "size": 0,
  "aggs": {
    "pays_origine": {
      "terms": {
        "field": "HomeCountry.keyword"
      }
    }
  }
}
```

### Réponse:
Angleterre: 318 passagers\
États-Unis: 291 passagers\
Irlande: 124 passagers\
Suède: 106 passagers\
Liban: 64 passagers\
Finlande: 56 passagers\
Canada: 41 passagers\
Bulgarie: 33 passagers\
France: 32 passagers\
Croatie: 30 passagers\

---


## Question 14: Villes Américaines de Destination 🏙️
```
GET /titanic_ethan/_search
{
  "size": 0,
  "query": {
    "term": {
      "DestinationCountry.keyword": "US"
    }
  },
  "aggs": {
    "villes_americaines_de_destination": {
      "terms": {
        "field": "Destination.keyword"
      }
    }
  }
}
```

### Réponse:
New York, New York, US: 127 passagers\
Chicago, Illinois, US: 75 passagers\
Detroit, Michigan, US: 28 passagers\
Brooklyn, New York, US: 25 passagers\
Philadelphie, Pennsylvanie, US: 25 passagers\

---

## Question 15: Villes de Destination qui Sont Aussi des Villes d'Origine 🔄
```
GET /titanic_ethan/_search
{
  "size": 0,
  "query": {
    "bool": {
      "filter": {
        "script": {
          "source": "doc['Destination.keyword'].value == doc['Boarded.keyword'].value"
        }
      }
    }
  }
}
```

### Réponse : 
Il y a 5 personnes dont la ville de destination est également leur ville d'origine.
