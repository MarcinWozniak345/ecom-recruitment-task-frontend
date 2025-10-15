import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
}

export default function CreateFootballer() {
    const [footballer, setFootballer] = useState<Footballer>({
        name: "",
        surname: "",
        number: "",
        position: "",
        nationality: "",
        numberOfMatches: "",
        goals: "",
        assists: "",
        age: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState<string>("");
    const navigate = useNavigate();

    const validate = () => {
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
        setFootballer({ ...footballer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError("");

        if (!validate()) return;

        try {
            const response = await fetch("https://localhost:7236/api/Footballers/CreateNewFootballer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(footballer),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || "Pi³karz zosta³ pomyœlnie dodany!");
                navigate("/");
            } else {
                const errorData = await response.json();
                setServerError(errorData.message || "Nie uda³o siê dodaæ pi³karza.");
            }
        } catch (error) {
            console.error("B³¹d:", error);
            setServerError("Wyst¹pi³ b³¹d podczas dodawania pi³karza.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                    <h3 className="text-center text-primary mb-4">Dodaj nowego zawodnika</h3>

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

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary px-5">
                                Zapisz
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