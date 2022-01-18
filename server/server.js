import express from "express";
import path from "path";

const app = express();

const MOVIES = [
    {
        title: "Tittel på film 1",
        plot: "Filmen handler om en kjekkas med navn Marcus, som blir veldig stor og sterk",
        year: 1997
    },
    {
        title: "De Urørlige",
        plot: "En funksjonshemmed mann finner en gangster som arbeidstaker, og det skjer mye kaos",
        year: 2010
    }
];

app.get("/api/movies", (req, res) => {
    res.json(MOVIES);
})

app.use(express.static(path.resolve("../dist")));

const server = app.listen(3000, () => {
    console.log("Listening on http://localhost:" + server.address().port);
});