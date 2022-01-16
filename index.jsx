import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";



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

function ListMovies({movies}) {
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

function NewMovie() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        MOVIES.push({title, year, plot});
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

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/movies" element={<ListMovies movies={MOVIES}/>} />
            <Route path="/movies/new" element={<NewMovie/>} />
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);