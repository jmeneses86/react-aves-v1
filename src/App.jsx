import { useState } from "react";
import useFetchAves from "./hooks/useFetchAves";

const App = () => {
    const [dataAve, setDataAve] = useState({});
    const [loading2, setLoading2] = useState(null);

    const { loading, error, data, setData } = useFetchAves(
        "https://aves.ninjas.cl/api/birds"
    );

    const handleOnChange = (e) => {
        e.preventDefault();
        if (e.target.value.length >= 3) {
            //console.log(e.target.value);
            const filteredData = data.filter((item) =>
                item.name.spanish
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            //console.log(filteredData);
            setData(filteredData);
        }
    };

    const handleClick = async (ave) => {
        //console.log(ave._links.self);
        setDataAve({});
        setLoading2(true);
        try {
            const res = await fetch(ave._links.self);
            if (!res.ok) throw new Error("Error al consumir la API");
            const dataAve = await res.json();
            setDataAve(dataAve);
        } catch (error) {
            console.log(error.message);
        } finally {
            //console.log("finally");
            setLoading2(false);
        }
    };

    return (
        <main role="main">
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">Aves Chilenas</h1>
                    <p className="lead text-muted text-justify">
                        La avifauna de Chile incluye un total de 586 especies,
                        con 198 aves pertenecientes al clado Passeriformes, en
                        total 13 son endémicas, correspondiendo 8 de ellas al
                        suborden Tyranni. Hasta el 2014: 6 especies han sido
                        introducidas y 88 son raras o accidentales. Actualmente
                        34 son las especies globalmente amenazadas de extinción.
                    </p>
                    <p>
                        <form>
                            <input
                                type="text"
                                id="ave"
                                name="ave"
                                placeholder="Ingrese el nombre de la ave"
                                className="form-control mb-2"
                                onChange={(e) => handleOnChange(e)}
                            ></input>
                        </form>
                    </p>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {loading && (
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        )}
                        {error.trim() !== "" && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {data.length > 0 ? (
                            data.map((ave) => (
                                <div className="col-md-4" key={ave.uid}>
                                    <div className="card mb-4 box-shadow">
                                        <img
                                            className="card-img-top"
                                            src={ave.images.main}
                                            alt={ave.name.spanish}
                                        />
                                        <div className="card-body">
                                            <p className="card-text">
                                                {ave.name.spanish}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        aria-current="true"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={() =>
                                                            handleClick(ave)
                                                        }
                                                    >
                                                        Ver
                                                    </button>
                                                    {/* <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    Edit
                                                </button> */}
                                                </div>
                                                {/* <small className="text-muted">
                                                9 mins
                                            </small> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="list-group-item">
                                {/* No se encontraron registros */}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Aves Chilenas
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {loading2 && (
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            )}
                            {Object.keys(dataAve).length > 0 && (
                                <div className="text-justify">
                                    <h2>{dataAve.name.spanish}</h2>
                                    <img
                                        src={dataAve.images.main}
                                        className="rounded mx-auto d-block img-thumbnail"
                                        alt={dataAve.name.spanish}
                                    ></img>
                                    <p>{dataAve.didyouknow}</p>
                                    <p>{dataAve.habitat}</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container">
                <div className="mb-5">
                    <h1 className="w-100 text-center">Aves Chilenas</h1>
                    <form>
                        <input
                            type="text"
                            id="ave"
                            name="ave"
                            placeholder="Ingresa el nombre de la ave"
                            className="form-control mb-2"
                            onChange={(e) => handleOnChange(e)}
                        ></input>
                    </form>
                </div>
                <div className="list-group">
                    {loading && (
                        <div className="list-group-item text-center">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                    {error.trim() !== "" && (
                        <div className="list-group-item list-group-item-danger">
                            {error}
                        </div>
                    )}

                    {data.length > 0 ? (
                        data.map((ave) => (
                            <button
                                key={ave.uid}
                                type="button"
                                className="list-group-item list-group-item-action"
                                aria-current="true"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <img
                                    src={ave.images.main}
                                    className="img-thumbnail"
                                    alt={ave.name.spanish}
                                ></img>
                                {ave.name.spanish}
                            </button>
                        ))
                    ) : (
                        <div className="list-group-item">
                            No se encontraron registros
                        </div>
                    )}
                </div>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-scrollable modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Modal title
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </main>
    );
};

export default App;
