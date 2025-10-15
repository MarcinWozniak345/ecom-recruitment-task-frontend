import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
interface Footballer {
    name: string;
    surname: string;
    numberOfMatches: number;
    goals: number;
    assists: number;
    guid: string;
}



export default function FootballerTable() {
    console.log(useState);
    const [footballers, setFootbalers] = useState<Footballer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:7236/api/Footballers/GetAllFootballers')
            .then((res) => res.json())
            .then((data) => {
                setFootbalers(data);
            }).catch((err) => { console.log(err); })
    },[])

    const handleDelete = async (guid: string) => {
        const confirmed = window.confirm("Jesteś pewien że chcesz usunąć zawodnika?");
        if (!confirmed) return;

        try {
            const response = await fetch(`https://localhost:7236/api/Footballers/DeleteFootballer/${guid}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Remove the deleted player from local state without reloading
                setFootbalers((prev) => prev.filter((f) => f.guid !== guid));
            } else {
                alert("Failed to delete the player. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting player:", error);
            alert("An error occurred while deleting the player.");
        }
    };



    const filtered = footballers.filter((f) =>
        `${f.name} ${f.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold text-primary"> Zawodnicy w klubie</h2>
                <p className="text-muted">Widok, zarządzanie, edycja</p>
            </div>

            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Szukaj po imieniu lub nazwisku"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-success px-4">
                            <a href="/footballer/create" className="bi bi-plus-circle me-2 text-white text-decoration-none"> Dodaj zawodnika</a> 
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle text-center">
                            <thead className="table-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Imie</th>
                                    <th>Nazwisko</th>
                                    <th>Liczba meczy</th>
                                    <th>Gole</th>
                                    <th>Asysty</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? (
                                    filtered.map((player, index) => (
                                        <tr key={index}>
                                            <td className="fw-semibold">{index + 1}</td>
                                            <td>{player.name}</td>
                                            <td>{player.surname}</td>
                                            <td>{player.numberOfMatches}</td>
                                            <td>{player.goals}</td>
                                            <td>{player.assists}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-info me-2"
                                                    onClick={() => navigate(`/footballer/details/${player.guid}`)}
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => navigate(`/footballer/edit/${player.guid}`)}
                                                >
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(player.guid)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center text-muted py-3">
                                            Problem z pobraniem zawodnikow
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
