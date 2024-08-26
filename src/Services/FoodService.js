
export const createFood = async (form) => {
    const response = await fetch('http://localhost:8000/index.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'food',
        descrip: form.descrip,
        type: form.type,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity)
      })
    });
    const data = await response.json();
    return data;
  };
  
  export const deleteFood = async (id) => {
    await fetch(`http://localhost:8080/deleteFood/${id}`, { method: 'DELETE' });
  };
  
  export const listFood = async () => {
    try {
      const xmlRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:food="http://localhost:3016/foodService">
           <soapenv:Header/>
           <soapenv:Body>
              <food:listFoodRequest/>
           </soapenv:Body>
        </soapenv:Envelope>
      `;
      
      const response = await fetch('http://localhost:3018/wsdl', {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml' },
        body: xmlRequest
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const textResponse = await response.text();
      
      if (!textResponse) {
        throw new Error('No data received from server');
      }
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textResponse, 'text/xml');
  
      const foodListElements = xmlDoc.getElementsByTagName('foodList');
      if (!foodListElements.length) {
        throw new Error('No food items found in the response');
      }
  
      const data = Array.from(foodListElements).map(food => ({
        id: food.getElementsByTagName('id')[0]?.textContent || 'N/A',
        descrip: food.getElementsByTagName('descrip')[0]?.textContent || 'N/A',
        type: food.getElementsByTagName('type')[0]?.textContent || 'N/A',
        price: food.getElementsByTagName('price')[0]?.textContent || '0',
        quantity: food.getElementsByTagName('quantity')[0]?.textContent || '0'
      }));
  
      return data;
    } catch (error) {
      console.error('Error fetching food data:', error.message || error);
      return []; 
    }
  };
  
  export const updateFood = async (id, form) => {
    const response = await fetch(`http://localhost:5002/api/petFood/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descrip: form.descrip,
        type: form.type,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity)
      })
    });
    const data = await response.json();
    return data;
  };
  