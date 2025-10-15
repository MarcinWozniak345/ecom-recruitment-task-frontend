import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Footballer {
    guid: string;
    name: string;
    surname: string;
    number: number;
    position: string;
    nationality: string;
    numberOfMatches: number;
    goals: number;
    assists: number;
    age: number;
}

export default function ViewDetails() {
    const { guid } = useParams<{ guid: string }>();
    const [footballer, setFootballer] = useState<Footballer | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!guid) return;

        fetch(`https://localhost:7236/api/Footballers/GetFootballer/${guid}`)
            .then((res) => res.json())
            .then((data) => setFootballer(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [guid]);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2">£aduje dane o pi³karzu...</p>
            </div>
        );
    }

    if (!footballer) {
        return (
            <div className="container text-center mt-5">
                <p className="text-danger">Nie znaleziono pi³karza.</p>
                <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
                    cofnij
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4 p-4">
                <div className="row align-items-center">
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                        <img
                            src={`https://ui-avatars.com/api/?name=${footballer.number}&background=0D6EFD&color=fff&size=200`}
                            alt={`Numer ${footballer.number}`}
                            className="rounded-circle border border-3 border-primary shadow-sm"
                            width="160"
                            height="160"
                        />
                    </div>

                    <div className="col-md-8">
                        <h3 className="text-primary fw-bold mb-3">
                            {footballer.name} {footballer.surname}
                        </h3>
                        <p className="mb-1">
                            <strong>Numer na koszulce:</strong> {footballer.number}
                        </p>
                        <p className="mb-1">
                            <strong>Pozycja:</strong> {footballer.position}
                        </p>
                        <p className="mb-1">
                            <strong>Narodowosc</strong> {footballer.nationality}
                        </p>
                        <p className="mb-1">
                            <strong>Wiek:</strong> {footballer.age}
                        </p>
                        <p className="mb-1">
                            <strong>Liczba meczy:</strong> {footballer.numberOfMatches}
                        </p>
                        <p className="mb-1">
                            <strong>Gole:</strong> {footballer.goals}
                        </p>
                        <p className="mb-3">
                            <strong>Asysty:</strong> {footballer.assists}
                        </p>
                        <div className="d-flex gap-2 mt-4">
                            <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                <i className="bi bi-arrow-left me-2"></i>
                            </button>
                            <button className="btn btn-primary">
                                <i className="bi bi-pencil-square me-2"></i> Edytuj
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}