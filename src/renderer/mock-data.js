// const TreeData = [
//     {
//         "id": 1,
//         "nivel": 1,
//         "fecha_nacimiento": "22-02-1942",
//         "foto": "foto.jpg",
//         "descripcion": "Una descripcion que puede ser cualquier cosa",
//         "fecha_fallecimiento": "12-10-2001",
//         "nombre": "Roberto Patriacota",
//         "genero": "hombre",
//         "padres": "",
//         "hijos":[
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",
//             "hijos": [
//                 {"id": 1,
//                 "fecha_nacimiento": "22-02-1942",
//                 "foto": "foto.jpg",
//                 "fecha_fallecimiento": "12-10-2001",
//                 "nombre": "Roberto Patriacota",
//                 "genero": "hombre"},
//                 {"id": 1,
//                 "fecha_nacimiento": "22-02-1942",
//                 "foto": "foto.jpg",
//                 "fecha_fallecimiento": "12-10-2001",
//                 "nombre": "Roberto Patriacota",
//                 "genero": "hombre",
//                 "hijos": [
//                     {"id": 1,
//                     "fecha_nacimiento": "22-02-1942",
//                     "foto": "foto.jpg",
//                     "fecha_fallecimiento": "12-10-2001",
//                     "nombre": "Roberto Patriacota",
//                     "genero": "hombre"},
//                     {"id": 1,
//                     "fecha_nacimiento": "22-02-1942",
//                     "foto": "foto.jpg",
//                     "fecha_fallecimiento": "12-10-2001",
//                     "nombre": "Roberto Patriacota",
//                     "genero": "hombre"}
//                 ]}
//             ]
//         },
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//             {"id": 1,
//             "fecha_nacimiento": "22-02-1942",
//             "foto": "foto.jpg",
//             "fecha_fallecimiento": "12-10-2001",
//             "nombre": "Roberto Patriacota",
//             "genero": "hombre",},
//         ]
//     },
// ]

// export default TreeData;

// const TreeData = [
//     {
//         "id": 1,
//         "nivel": 1,
//         "pareja": {
//             "id": 2,
//             "nombre": "Julia Turuntello",
//             "fecha_nacimiento": "10-05-1950",
//             "fecha_fallecimiento": "03-01-2009",
//             "fecha_casamiento": "26-07-1962",
//             "descripcion": "Otra descripción. No lo pienses tanto",
//             "foto": "foto2.jpg",
//             "genero": "mujer",
//             "pareja": {
//                 "id": 1,
//                 "nombre": "Roberto Patriacota"
//             },
//             "padres": ""
//         },
//         "fecha_casamiento": "26-07-1962",
//         "fecha_nacimiento": "22-02-1942",
//         "foto": "foto.jpg",
//         "hijos": [
//             {
//                 "id": 5,
//                 "pareja": {
//                     "id": 6,
//                     "nombre": "Silvana Ropopo",
//                     "fecha_nacimiento": "25-03-1978",
//                     "fecha_fallecimiento": null,
//                     "fecha_casamiento": "06-09-2006",
//                     "descripcion": null,
//                     "foto": "foto7.jpg",
//                     "genero": "mujer",
//                     "pareja": {
//                         "id": 5,
//                         "nombre": "Raul Patriacota"
//                     },
//                     "padres": ""
//                 },
//                 "fecha_casamiento": "06-09-2006",
//                 "padre": {
//                     "id": 1
//                 },
//                 "fecha_nacimiento": "29-03-1978",
//                 "foto": "foto3.jpg",
//                 "hijos": [
//                 {
//                     "id": 8,
//                     "padre": {
//                         "id": 5
//                     },
//                     "fecha_nacimiento": "02-06-1994",
//                     "foto": "foto4.jpg",
//                     "hijos": [
                    
//                     ],
//                     "nombre": "Damian Patriacota",
//                     "genero": "hombre",
//                     "pareja": null,
//                     "padres": "Raul Patriacota - Silvana Ropopo"
//                 },
//                 {
//                     "id": 7,
//                     "padre": {
//                         "id": 5
//                     },
//                     "fecha_nacimiento": "17-02-1993",
//                     "foto": "foto4.jpg",
//                     "hijos": [
                    
//                     ],
//                     "nombre": "Julieta Patriacota",
//                     "genero": "mujer",
//                     "pareja": null,
//                     "padres": "Raul Patriacota - Silvana Ropopo"
//                 }
//                 ],
//                 "nombre": "Raul Patriacota",
//                 "genero": "hombre",
//                 "padres": "Roberto Patriacota - Julia Turuntello"
//             },
//             {
//                 "id": 4,
//                 "padre": {
//                     "id": 1
//                 },
//                 "fecha_nacimiento": "15-09-1973",
//                 "foto": "foto3.jpg",
//                 "hijos": [
                
//                 ],
//                 "nombre": "Jorge Patriacota",
//                 "genero": "hombre",
//                 "pareja": null,
//                 "padres": "Roberto Patriacota - Julia Turuntello"
//             },
//             {
//                 "id": 3,
//                 "padre": {
//                     "id": 1
//                 },
//                 "fecha_nacimiento": "30-12-1970",
//                 "foto": "foto4.jpg",
//                 "hijos": [
                
//                 ],
//                 "nombre": "Laura Patriacota",
//                 "genero": "mujer",
//                 "pareja": null,
//                 "padres": "Roberto Patriacota - Julia Turuntello"
//             }
//         ],
//         "descripcion": "Una descripcion que puede ser cualquier cosa",
//         "fecha_fallecimiento": "12-10-2001",
//         "nombre": "Roberto Patriacota",
//         "genero": "hombre",
//         "padres": ""
//     }
// ]

const TreeData = [
    {
        "id": 1,
        "nivel": 1,
        "birthdate": "02-22-1942",
        "dod": "12-10-2001",
        "photo": "foto.jpg",
        "childeren": [],
        "description": "",
        "name": "Big Dog",
        "parents": []
    }
]

export default TreeData;