import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CarList() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/cars");
        if (response.ok) {
          const data = await response.json();
          setCars(data);
        } else {
          setError("Error fetching cars. " + response.statusText);
        }
      } catch (err) {
        setError("Error fetching cars.");
      }
    }

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      {error && <p>{error}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {cars.map((car) => (
          <div key={car.id} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            {car.images ? (
              <img src={car.images} alt={`${car.make} ${car.model}`} style={{ width: "100px", height: "auto" }} />
            ) : (
              <div style={{ width: "100px", height: "auto", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                No Image
              </div>
            )}
            <Link to={`/car/${car.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <strong>
                  {car.make} {car.model} ({car.year})
                </strong>
                <p>${car.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
