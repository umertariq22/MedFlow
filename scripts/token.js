export default async function tokenExtractor(){
    let token = localStorage.getItem("token");
    if (!token) return null;
    const res = await fetch('http://localhost:3000/api/validateToken', {
        method: 'POST',
        body: JSON.stringify({
            token: token
        }),
        headers: {
            'Content-type': 'application/json'
        }});
    const data = await res.json();
    return data;
}