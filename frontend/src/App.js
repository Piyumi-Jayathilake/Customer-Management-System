import React, {useEffect, useState} from "react";
import axios from "axios";

function App(){
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    nic: "",
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
  axios.post(API,form, {
    headers:{
      "Content-Type": "application/json"
    }
  }).then(() =>{
    fetchCustomers();
    setForm({name: "", dateOfBirth: "", nic: ""});
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
  axios.put(`${API}/${editingId}`,form,{
    headers:{
      "Content-Type": "application/json"
    }
  }).then(() =>{
    fetchCustomers();
    setEditingId(null);
    setForm({name: "", dateOfBirth: "", nic: "" });
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

return(
  <div style={{padding: "20px"}}>
    <h2>Customer Management</h2>
  

  {/* Form to add a new customer */}
    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
    <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
    <input name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} />

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
        <th>Actions</th>
      </tr></thead>
      <tbody>
        {customers.map(c =>(
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.dateOfBirth}</td>
            <td>{c.nic}</td>
            <td>
              <button onClick={() =>{
                setEditingId(c.id);
                setForm({name: c.name,
                  dateOfBirth: c.dateOfBirth,
                  nic: c.nic
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