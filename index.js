const express = require('express')
const ejs = require('ejs')
const path = require("path")

const app = express()

const PORT = process.env.PORT || 3030

const matk1 = {
    nimetus: "Rattamatk Kõrvemaal",
    pildiUrl: "/assets/Korvemaa.jpg",
    kirjeldus: "Põhja-Kõrvemaa loodusmaastik on kui loodud rattamatkade jaoks – tihe teedevõrgustik 36 000 hektaril, RMK matkarajad, avar ja omanäoline Jussi kanarbiku nõmm",
    osalejad: []
}

const matk2 = {
    nimetus: "Kevadine matk Hiiumaal",
    pildiUrl: "/assets/Hiiumaa.jpg",
    kirjeldus: "Matk kulgeb piki RMK Hiiumaa matkateed ja läbi Hiiumaa kõige kaunima piirkonna, Kõpu poolsaare, kuhu jäävad tuntud Hiiumaa maamärgid Kõpu ja Ristna tuletorn.",
    osalejad: []
}

const matk3 = {
    nimetus: "Talvine räätsamatk",
    pildiUrl: "/assets/Viru.jpg",
    kirjeldus: "Räätsamatk, unikaalne viis looduse avastamiseks. Räätsamatk soodes on kõige ägedam ja Eestile eripäraseim matk, mida mujal maailmas ei pakuta.",
    osalejad: []
}

const matkad = [matk1, matk2, matk3]

function registreeruMatkale(matkaIndex, nimi, email) {
    if (matkaIndex > matkad.length) {
        console.log("Vale matka indeks")
        return
    }
    const matk = matkad[matkaIndex]
    const uusMatkaja = {
        nimi: nimi,
        email: email,
        registreerumiseAeg: new Date()
    }
    matk.osalejad.push(uusMatkaja)
    console.log(matkad)
}

function kontakteeruMeiega(nimi, email, markus) {
    const uusKontakt = {
        nimi: nimi,
        email: email,
        markus: markus,
    }
    s6numid.push(uusKontakt)
    console.log(s6numid)
}

const s6numid = []

const uudis1 = {
    nimetus: "Kõrvemaa lõkkeplatside uuendus",
    pildiUrl: "/assets/grill.jpg",
    kirjeldus: "Mitmed RMK lõkkeplatsid on saanud uue kuue",
}

const uudis2 = {
    nimetus: "Uus matk!",
    pildiUrl: "/assets/Viru.jpg",
    kirjeldus: "Teeme nüüd matkasid ka talvistele rabateedele",
}

const uudis3 = {
    nimetus: "Süstamatk Hiiumaal tuleb taas!",
    pildiUrl: "/assets/Hiiumaa.jpg",
    kirjeldus: "Registreeri end Hiiumaa süstamatkale - kohad täituvad ruttu!",
}

const uudis4 = {
    nimetus: "Hoolda enda jalgratast targalt",
    pildiUrl: "/assets/ratas.jpeg",
    kirjeldus: "Jagame nippe, kuidas enda jalgratas hooajaks valmis panna.",
}

const uudis5 = {
    nimetus: "Lastematk",
    pildiUrl: "/assets/Korvemaa.jpg",
    kirjeldus: "Andke märku, kel oleks huvi lastematka vastu!",
}

const uudis6 = {
    nimetus: "Matkaklubi 5. sünnipäev",
    pildiUrl: "/assets/sunnipaev.jpg",
    kirjeldus: "Matkaklubi sünnipäeva tähistasime juubeli puhul nii."
}

const uudised = [uudis1, uudis2, uudis3, uudis4, uudis5, uudis6]

function naitaUudised(req, res) {
    res.render("uudised", {uudised: uudised})
}

app.get('/test', (req, res) => {res.end('kõik töötab!')})
app.use('/', express.static('public'))

app.use(express.urlencoded())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {res.render("esileht", {matkad: matkad})})
app.get('/matk/:matkId', (req, res) => {
    const matkaIndex = req.params.matkId
    res.render("matk", { matk: matkad[matkaIndex], id: matkaIndex})
})
app.get('/uudised', naitaUudised)
app.get('/uudis/:uudisId', (req, res) => {
    const uudiseIndex = req.params.uudisId
    res.render("uudis", { uudis: uudised[uudiseIndex]})
})

app.get('/registreerumine', (req, res) => {
    registreeruMatkale (
        req.query.matkaIndex,
        req.query.nimi,
        req.query.email,
    )
    res.render('reg_kinnitus', {matk: matkad[req.query.matkaIndex], nimi: req.query.nimi})
})

app.get('/kontakt', (req, res) => {res.render("kontakt")})
app.post('/s6num', (req, res) => {
    console.log(req.body)
    kontakteeruMeiega (
        req.body.nimi,
        req.body.email,
        req.body.markused,
    )
    res.render('s6num_kinnitus', {nimi: req.body.nimi})
}
)

app.post('/registreerumine', (req, res) => {
    console.log(req.body)
    registreeruMatkale (
        req.body.matkaIndex,
        req.body.nimi,
        req.body.email,
    )
    res.render('reg_kinnitus', {matk: matkad[req.body.matkaIndex], nimi: req.body.nimi})
})


app.listen(PORT)