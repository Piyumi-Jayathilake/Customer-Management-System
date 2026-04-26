import React, {useEffect, useState} from "react";
import axios from "axios";

function App(){
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    nic: "",
    mobileNumbers:[""]
  });
  const[editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  

const EXCEL_API = "http://localhost:8080/api/excel/upload"; 

const API = "http://localhost:8080/api/customers";

useEffect(() => {
  fetchCustomers();
}, []);

const fetchCustomers =() => {
  axios.get(API).then(res => setCustomers(res.data));
};

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value});
};

const addCustomer = () => {
  if(!validateForm()) return;
  axios.post(API,form, {
    headers:{
      "Content-Type": "application/json"
    }
  }).then(() =>{
    fetchCustomers();
    setForm({name: "", dateOfBirth: "", nic: "", mobileNumbers: [""] });
  });
};

const deleteCustomer = (id) =>{
  axios.delete(`${API}/${id}`).then(() =>{
    setCustomers(prev => prev.filter(c => c.id !== id));
  }).catch(err => {
    console.error(err);
    alert("Delete Failed");
  });
};

const updateCustomer = () => {
  if(!validateForm()) return;

  axios.put(`${API}/${editingId}`,form,{
    headers:{
      "Content-Type": "application/json"
    }
  }).then(() =>{
    fetchCustomers();
    setEditingId(null);
    setForm({name: "", dateOfBirth: "", nic: "", mobileNumbers: [""] });
  });
};

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
}

const uploadExcel = () => {
  const formData = new FormData();
  formData.append("file", file);

  axios.post(EXCEL_API,formData).then(() =>{
    alert("Excel File Uploaded Successfully");
    fetchCustomers();
  }).catch((err) =>{
    alert("Upload Failed");
  });
};

const handleMoblieChange = (index, value) => {
  const updated = [...form.mobileNumbers];
  updated[index] = value;
  setForm({...form, mobileNumbers: updated});
};
const addMobileFeild = ()=>{
  setForm({...form, mobileNumbers: [...form.mobileNumbers, ""]});
};
const validateForm =() => {
  if(!form.name || !form.dateOfBirth || !form.nic){
    alert("Please fill all mandatory fields (Name, Date of Birth, NIC)");
    return false;
  }
  return true;
};

return(
  <div style={{padding: "20px"}}>
    <h2>Customer Management</h2>
  

  {/* Form to add a new customer */}
    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
    <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
    <input name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} />

    <h4>Mobile Numbers</h4>
    {form.mobileNumbers.map((num, index) => (
      <input key={index} placeholder="Mobile Number" value={num} onChange={(e) => handleMoblieChange(index, e.target.value)} />
    ))}

    <button onClick={addMobileFeild}>Add Mobile Number</button>
    <br /><br />


    <button onClick={editingId ? updateCustomer : addCustomer}>
      {editingId ? "Update Customer" : "Add Customer"}
    </button>
    <hr />

    <h3>Upload Excel</h3>
    <input type="file" onChange={handleFileChange} />
    <button onClick={uploadExcel}>Upload</button>
    
    <hr />
    {/*Table*/}
    <table border = "1">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Date of Birth</th>
        <th>NIC</th>
        <th>Mobile Numbers</th>
        <th>Actions</th>
      </tr></thead>
      <tbody>
        {customers.map(c =>(
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.dateOfBirth}</td>
            <td>{c.nic}</td>
            <td>{c.mobileNumbers.join(", ")}</td>
            <td>
              <button onClick={() =>{
                setEditingId(c.id);
                setForm({name: c.name,
                  dateOfBirth: c.dateOfBirth,
                  nic: c.nic,
                  mobileNumbers: c.mobileNumbers || [""]
                });
              }}>Edit</button>
            
              <button onClick={() => deleteCustomer(c.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>

</div>
  
);


}
export default App;