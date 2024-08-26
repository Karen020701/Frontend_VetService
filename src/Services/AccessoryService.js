
import axios from 'axios';


export const createAccessory = async (data) => {
  try {
    const response = await axios.post('http://localhost:8000/index.php', data);
    return response.data;
  } catch (error) {
    console.error('Error creating accessory:', error);
  }
};


export const getAccessories = async () => {
  try {
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acc="http://localhost:3016/accessoryService">
        <soapenv:Header/>
        <soapenv:Body>
          <acc:listAccessoryRequest></acc:listAccessoryRequest>
        </soapenv:Body>
      </soapenv:Envelope>`;
      
    const response = await axios.post('http://localhost:3016/wsdl', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
    });

    
    if (!response.data) {
      throw new Error('No data received from server');
    }

    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    

    const accessoryElements = xmlDoc.getElementsByTagName("accessoryList");
    if (!accessoryElements.length) {
      throw new Error('No accessories found in the response');
    }

    const accessories = Array.from(accessoryElements).map(accessory => ({
      id: accessory.getElementsByTagName("id")[0]?.textContent || 'N/A',
      name: accessory.getElementsByTagName("name")[0]?.textContent.trim() || 'N/A',
      type: accessory.getElementsByTagName("type")[0]?.textContent.trim() || 'N/A',
      price: accessory.getElementsByTagName("price")[0]?.textContent || '0',
      quantity: accessory.getElementsByTagName("quantity")[0]?.textContent || '0',
    }));
    
    return accessories;
  } catch (error) {
    console.error('Error fetching accessories:', error.message || error);
    return []; 
  }
};


export const updateAccessory = async (id, data) => {
    try {
      const accessoryData = {
        name: data.name,
        type: data.type,
        price: data.price,
        quantity: data.quantity
      };
  
      const response = await axios.put(`http://localhost:5000/api/accessories/${id}`, accessoryData);
      return response.data;
    } catch (error) {
      console.error('Error updating accessory:', error);
    }
  };
  


export const deleteAccessory = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3013/deleteAccessory/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting accessory:', error);
  }
};


