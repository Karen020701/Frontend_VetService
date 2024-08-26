export const createToy = async (toy) => {
    try {
        const response = await fetch('http://localhost:8006/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toy),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating toy:', error);
    }
};

export const listToys = async () => {
    try {
        const response = await fetch('http://localhost:3031/wsdl', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml',
            },
            body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:toy="http://localhost:3016/toyService">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <toy:listToyRequest/>
                        </soapenv:Body>
                    </soapenv:Envelope>`,
        });
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

       
        const toys = Array.from(xmlDoc.getElementsByTagName("toyList")).map(toyNode => ({
            id: toyNode.getElementsByTagName("id")[0].textContent,
            name: toyNode.getElementsByTagName("name")[0].textContent,
            type: toyNode.getElementsByTagName("type")[0].textContent,
            price: parseFloat(toyNode.getElementsByTagName("price")[0].textContent),
            quantity: parseInt(toyNode.getElementsByTagName("quantity")[0].textContent),
        }));

        return toys;
    } catch (error) {
        console.error('Error listing toys:', error);
    }
};

export const updateToy = async (id, toy) => {
    try {
        const response = await fetch(`http://localhost:5003/api/toys/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toy),
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating toy:', error);
    }
};
