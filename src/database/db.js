const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize( () => {
//     //criar
// //     db.run(`
// //         CREATE TABLE IF NOT EXISTS places(
// //             id INTEGER PRIMARY KEY AUTOINCREMENT, 
// //             image TEXT,
// //             name TEXT,
// //             address TEXT,
// //             address2 TEXT,
// //             state TEXT,
// //             city TEXT,
// //             items TEXT
// //         );
// //     `)

// //     //inserir
// //     const query = `
// //     INSERT INTO places (
// //         image,
// //         name,
// //         address,
// //         address2,
// //         state,
// //         city,
// //         items
// //     ) VALUES (?,?,?,?,?,?,?);
// // `

// //     const values = [
// //         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSs1to5wSlnNdvnWLVc40mAF2kmOhcSIvF8Yv8e-a9Gi4PkuUNH&usqp=CAU",       
// //         "Papersider",
// //         "Guilherme Gemballa, Jardim América",
// //         "N°260",
// //         "Santa Catarina",
// //         "Rio do Sul",
// //         "Papéis e Papelão"
// //     ]

// //     function afterInsertData(err){
// //         if(err){
// //             return console.log(err)
// //         }

// //         console.log("Cadastrado com sucesso")
// //         console.log(this)
// //     }

// //     db.run(query, values, afterInsertData)

//     //consultar
//     // db.all(`SELECT * FROM places`, function(err, rows){
//     //     if(err){
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })


    //deletar
    db.run(`DELETE FROM places WHERE id = ?`, [25], function(err){
        if(err){
            return console.log(err)
        }
        console.log('Registro deletado com sucesso')
    })

}) 