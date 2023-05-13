import NavBar from "@/components/NavBar";

export default function Specialization({ doctors }) {
  return (
    <div className="d-flex flex-column" style={{minHeight:"100vh"}}>
      <NavBar />
      <div className="container-fluid bg-light flex-grow-1">
        <div className="container bg-white py-2">
          <div className="row px-3 mt-3">
            <div className="d-flex flex-wrap">
              {doctors[0].length == 0 ? (
                <h1 className="display-4">
                  No Doctors Found for this Specialization
                </h1>
              ) : (
                <>
                  {doctors[0].map((doctor) => (
                    <div
                      className="col-md-6 px-0 mb-3 px-2"
                      key={doctor.doc_id}
                    >
                      <div className="card border-0 shadow-sm h-100">
                        <div className="row g-0">
                          <div className="card-body">
                            <h5 className="card-title">
                              {doctor.first_name} {doctor.last_name}
                            </h5>
                            <p className="card-text">
                              <small className="text-muted">
                                {doctor.degree}
                              </small>
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                {doctor.description}
                              </small>
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                {doctor.experience} Years of Experience
                              </small>
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Rs {doctor.fees}
                              </small>
                            </p>
                            <a
                              href={`/doctors/${doctor.doctor_id}`}
                              className="btn btn-primary"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let { id } = context.query;
  const res = await fetch(
    `http://localhost:3000/api/doctor/getBySpec?id=${id}`,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const doctors = await res.json();
  return {
    props: {
      doctors,
    },
  };
}
