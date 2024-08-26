const API_BASE_URL = 'http://localhost:8000/index.php'; 
const DELETE_API_BASE_URL = 'http://localhost:3014/deleteMedicine'; 
const LIST_API_BASE_URL = 'http://localhost:3019/wsdl'; 

export const createMedicine = async (medicine) => {
  await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'medicine',
      name: medicine.name,
      usage: medicine.usage,
      price: parseFloat(medicine.price),
      quantity: parseInt(medicine.quantity)
    })
  });
};

export const deleteMedicine = async (id) => {
  await fetch(`${DELETE_API_BASE_URL}/${id}`, { method: 'DELETE' });
};

export const updateMedicine = async (id, medicine) => {
  await fetch(`http://localhost:5001/api/medicines/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: medicine.name,
      usage: medicine.usage,
      price: parseFloat(medicine.price),
      quantity: parseInt(medicine.quantity)
    })
  });
};

export const fetchMedicines = async () => {
  const response = await fetch(LIST_API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    body: `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:med="http://localhost:3019/medicineService">
        <soapenv:Header/>
        <soapenv:Body>
          <med:listMedicineRequest/>
        </soapenv:Body>
      </soapenv:Envelope>`
  });

  const textResponse = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(textResponse, 'text/xml');
  const medicineListElements = xmlDoc.getElementsByTagName('medicineList');
  
  return Array.from(medicineListElements).map(medicine => ({
    id: medicine.getElementsByTagName('id')[0]?.textContent || 'N/A',
    name: medicine.getElementsByTagName('name')[0]?.textContent || 'N/A',
    usage: medicine.getElementsByTagName('usage')[0]?.textContent || 'N/A',
    price: medicine.getElementsByTagName('price')[0]?.textContent || 'N/A',
    quantity: medicine.getElementsByTagName('quantity')[0]?.textContent || 'N/A',
  }));
};
