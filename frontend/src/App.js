import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";

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
  <div className="container">
    <div className="header">
  <img src="./CMS.jpeg" alt="logo" className="logo" />
  <h2>Customer Management System</h2>
</div>
  

  {/* Form to add a new customer */}
  <div className="form-card">
    <div className="form-row">
      <div>
        <label>Name </label>
    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
    </div>

    <div>
      <label>Date of Birth </label>
    <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
    </div>

    <div>
      <label>NIC </label>
    <input name="nic" placeholder="NIC" value={form.nic} onChange={handleChange} />
    </div>
  </div>
 <div className="form-row">
  <div>
    <label>Mobile Numbers </label>
    {form.mobileNumbers.map((num, index) => (
        <div key={index} className="mobile-row">
          <input
            placeholder="Enter mobile number"
            value={num}
            onChange={(e) => handleMoblieChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>

    <div>
       <button className="btn-secondary" onClick={addMobileFeild}>
        + Add Mobile Number
      </button>
          </div>
          </div>

    <br /><br />
    
    <button className="btn-primary" onClick={editingId ? updateCustomer : addCustomer}>
      {editingId ? "Update Customer" : "Add Customer"}
    </button>
    </div>

    <div className="excel-card">

    <h3>Upload Excel</h3>
    <input type="file" onChange={handleFileChange} />
    <button className="btn-success" onClick={uploadExcel}>Upload</button>
    </div>
    
    <hr />
    {/*Table*/}
    <table className="custom-table">
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
              <button className="btn-edit" onClick={() =>{
                setEditingId(c.id);
                setForm({name: c.name,
                  dateOfBirth: c.dateOfBirth,
                  nic: c.nic,
                  mobileNumbers: c.mobileNumbers || [""]
                });
              }}>Edit</button>
            
              <button className="btn-delete" onClick={() => deleteCustomer(c.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>

</div>
  
);

}

export default App;