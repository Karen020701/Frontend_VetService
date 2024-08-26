import axios from 'axios';

const SOAP_ENDPOINT = 'http://localhost:3023/wsdl?wsdl';

export const listBranches = async () => {
  try {
    const response = await axios.post(SOAP_ENDPOINT, `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bran="http://localhost:3016/branchService">
        <soapenv:Header/>
        <soapenv:Body>
          <bran:listBranchRequest/>
        </soapenv:Body>
      </soapenv:Envelope>`, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    
    const branchListNodes = xmlDoc.getElementsByTagName('branchList');
    const branches = Array.from(branchListNodes).map(node => ({
      id: node.getElementsByTagName('id')[0].textContent,
      name: node.getElementsByTagName('name')[0].textContent,
      address: node.getElementsByTagName('address')[0].textContent,
      phone_number: node.getElementsByTagName('phone_number')[0].textContent,
    }));
    
    return branches;
  } catch (error) {
    console.error('Error listing branches:', error);
    throw error;
  }
};
