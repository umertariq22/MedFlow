import { useEffect,useState } from 'react';

export default function Post({ doctor }) {
  let data = doctor[0];
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() =>{
    if(data.length == 0){
        alert("No doctor found");
    }else{
        setFname(data[0].first_name);
        setLname(data[0].last_name);
        setSpecialization(data[0].specialization);
        setEmail(data[0].email);
        setAddress(data[0].address);
    }
  },[])
  return (
    <div>
        <h1>{fname} {lname}</h1>
        <h2>{specialization}</h2>
        <h3>{email}</h3>
        <h3>{address}</h3>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/doctor/searchDoctor?id=${id}`);
  const doctor = await res.json();
  return {
    props: {
      doctor,
    },
  };
}
