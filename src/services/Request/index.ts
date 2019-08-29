export default function req(url: string, method: string, body?: object, headertoken?: string) {
    return (fetch(`http://localhost:3200/v1/${url}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'authorization': `${headertoken}` },
        body: JSON.stringify(body)
    }).then(response => response.json())
    );
}