export default function Specialization({ doctors}) {
  return <div></div>;
}

export async function getServerSideProps(context) {
  let { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/doctor/getBySpec?id=${id}`, {
    headers: {
      "Content-type": "application/json",
    }
  });
  const doctors = await res.json();
    return {
        props: {
            doctors
        }
    };
}
