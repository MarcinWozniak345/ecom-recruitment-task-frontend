import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Footballer {
    name: string;
    surname: string;
    number: number | "";
    position: string;
    nationality: string;
    numberOfMatches: number | "";
    goals: number | "";
    assists: number | "";
    age: number | "";
    guid: string;
}

export default function EditFootballer() {
    const { guid } = useParams<{ guid: string }>();
    const [footballer, setFootballer] = useState<Footballer | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!guid) return;

        fetch(`https://localhost:7236/api/Footballers/GetFootballer/${guid}`)
            .then((res) => res.json())
            .then((data) => setFootballer(data))
            .catch((err) => console.error(err));
    }, [guid]);

    const validate = () => {
        if (!footballer) return false;

        const newErrors: { [key: string]: string } = {};

        if (!footballer.name) newErrors.name = "Imie jest wymagane";
        if (!footballer.surname) newErrors.surname = "Nazwisko jest wymagane";
        if (!footballer.number) newErrors.number = "Numer jest wymagany";
        if (!footballer.position) newErrors.position = "Pozycja jest wymagana";
        if (!footballer.nationality) newErrors.nationality = "Narodowosc jest wymagana";
        if (!footballer.age) {
            newErrors.age = "Wiek jest wymagany";
        } else if (Number(footballer.age) < 16) {
            newErrors.age = "Wiek musi wynosiæ co najmniej 16 lat";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!footballer) return;
        setFootballer({ ...footballer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");

        if (!validate() || !footballer) return;

        try {
            const response = await fetch("https://localhost:7236/api/Footballers/UpdateFootballer", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(footballer),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                navigate("/");
            } else {
                const errorData = await response.json();
                setServerError(errorData.message || "Nie uda³o siê zaktualizowaæ pi³karza.");
            }
        } catch (error) {
            console.error("B³¹d:", error);
            setServerError("Wyst¹pi³ b³¹d podczas aktualizacji pi³karza.");
        }
    };

    if (!footballer) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3 text-muted">Wczytywanie danych pi³karza...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                    <h3 className="text-center text-primary mb-4">Edycja zawodnika</h3>

                    {serverError && (
                        <div className="alert alert-danger text-center py-2">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Imie</label>
                            <input
                                name="name"
                                value={footballer.name}
                                onChange={handleChange}
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Nazwisko</label>
                            <input
                                name="surname"
                                value={footballer.surname}
                                onChange={handleChange}
                                className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                            />
                            {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Numer na koszulce</label>
                            <input
                                type="number"
                                name="number"
                                value={footballer.number}
                                onChange={handleChange}
                                className={`form-control ${errors.number ? "is-invalid" : ""}`}
                            />
                            {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Pozycja</label>
                            <input
                                name="position"
                                value={footballer.position}
                                onChange={handleChange}
                                className={`form-control ${errors.position ? "is-invalid" : ""}`}
                            />
                            {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Narodowosc</label>
                            <input
                                name="nationality"
                                value={footballer.nationality}
                                onChange={handleChange}
                                className={`form-control ${errors.nationality ? "is-invalid" : ""}`}
                            />
                            {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Liczba meczy</label>
                            <input
                                type="number"
                                name="numberOfMatches"
                                value={footballer.numberOfMatches}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Gole</label>
                            <input
                                type="number"
                                name="goals"
                                value={footballer.goals}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Asysty</label>
                            <input
                                type="number"
                                name="assists"
                                value={footballer.assists}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Wiek</label>
                            <input
                                type="number"
                                name="age"
                                value={footballer.age}
                                onChange={handleChange}
                                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                            />
                            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                        </div>
                        <input type="hidden" name="guid" value={footballer.guid} readOnly />
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary px-5">
                                Zapisz zmiany
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary px-4 ms-3"
                                onClick={() => navigate("/")}
                            >
                                Anuluj
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}