import * as React from "react";
import {useState, useEffect} from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom";



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

function FrontPage() {
    /* Link til sidene */
    return <div>
    <h1>Kristiania Movie Database</h1>
        <ul>
            <li><Link to="/movies">List movies</Link></li>
            <li><Link to="/movies/new">New movie</Link></li>
        </ul>
    </div>
}

function ListMovies({moviesApi}) {
    const [movies, setMovies] = useState();
    useEffect(async () => {
        setMovies(undefined);
        setMovies(await moviesApi.listMovies());
    }, []);

    if (!movies) {
        return <div>Loading...</div>
    }

    return <div>
        <h1>List movies</h1>

            {movies.map(m =>
                <div key={m.title}>
                    <h2>{m.title} ({m.year})</h2>
                    <div>{m.plot}</div>
                </div>
            )}
    </div>;
}

/* For å legge til ny film */
/* useNavigate() verdi for å navigere i sidene */
function NewMovie({moviesApi}) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();

    /* push for å pushe moviesene til list movies via handleSubmit. */
    /* For å komme til hovedsiden med navigate ("/") */
    async function handleSubmit(e) {
        e.preventDefault();
        await moviesApi.onAddMovie({title, year, plot});
        navigate("/");
    }

    return <form onSubmit={handleSubmit}>
        <h1>New movie</h1>
        <div>
            <label>Title: <input value={title} onChange={e => setTitle(e.target.value)} /></label>
        </div>
        <div>
            <label>Year: <input value={year} onChange={e => setYear(e.target.value)} /></label>
        </div>
        <div>
            <label>Plot: <textarea value={plot} onChange={e => setPlot(e.target.value)} /></label>
        </div>
        <button>Submit</button>
        <pre>
            {JSON.stringify({title, year, plot})}
        </pre>
    </form>
}

/* For å linke sidene */
function Application() {
    const moviesApi = {
        onAddMovie: async (m) => MOVIES.push(m),
        listMovies: async () => MOVIES
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/movies" element={<ListMovies moviesApi={moviesApi}/>} />
            <Route path="/movies/new" element={<NewMovie moviesApi={moviesApi}/>} />
        </Routes>
    </BrowserRouter>;
}


/* Henter app i index.html */
ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);