import { useEffect,useState } from "react";
import Loader from "./Loader";
export default function SearchBySpec() {
    const [specializations, setSpecializations] = useState(null);
    useEffect(() =>{
        (async () => {
            const res = await fetch("http://localhost:3000/api/getSpecializations", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json();
            setSpecializations(data[0]);
          })();
    },[]);
  return (
    <>
        {specializations == null ? (<Loader />) :(
            <div className="container-fluid bg-primary my-5 py-5">
            <div className="container py-5">
                <div className="text-center mx-auto mb-5" style={{maxWidth: "500px"}}>
                    <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Find A Doctor</h5>
                    <h1 className="display-4 mb-4">Find A Healthcare Professionals</h1>
                    <h5 className="text-white fw-normal">Duo ipsum erat stet dolor sea ut nonumy tempor. Tempor duo lorem eos sit sed ipsum takimata ipsum sit est. Ipsum ea voluptua ipsum sit justo</h5>
                </div>
                <div className="mx-auto" style={{width: "100%", maxWidth: "600px"}}>
                    <div className="input-group">
                        <select className="form-select border-primary w-25" style={{height: "60px"}}>
                            <option defaultValue>Specialization</option>
                            {specializations.map((spec) => (
                                <option key={spec.spec_id} value={spec.spec_id}>{spec.spec_name}</option>
                            ))}
                        </select>
                        <input type="text" className="form-control border-primary w-50" placeholder="Keyword"/>
                        <button className="btn btn-dark border-0 w-25">Search</button>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
  );
}
