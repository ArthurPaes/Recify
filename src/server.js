const express = require("express");
const server = express();

const db = require("./database/db.js")

server.use(express.static("public"))

//enable req.body
server.use(express.urlencoded({ extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


server.get("/", (request, response)=>{
    return response.render("index.html")                
})



server.get("/create-point", (request, response)=>{

    // console.log(request.query)

    return response.render("create-point.html")                
})

server.post("/savepoint", (request, response)=>{

    // console.log(request.body)

            //insere
            const query = `
             INSERT INTO places (
                image,
                 name,
                 address,
                address2,
                 state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?); `

        const values = [
            request.body.image,
            request.body.name,
            request.body.address,
            request.body.adress2,
            request.body.state,
            request.body.city,
            request.body.items

        ]

        function afterInsertData(err){
            if(err){
                console.log(err)
                return response.render("create-point.html", {erro: true})
                }

            console.log("Cadastrado com sucesso")
            console.log(this)

            return response.render("create-point.html", {saved: true})
        }

        db.run(query, values, afterInsertData)

})


server.get("/search", (request, response)=>{

    const search =  request.query.search

    if(search == ""){
        return response.render("search-results.html", { total:0})   
    }




    //consulta
    // pegar os dados da db
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length

        // html com dados da db
        return response.render("search-results.html", { places: rows, total: total})   
    })

            
})

server.listen(3000, ()=>{
    console.log("listening on: http://localhost:3000")
})