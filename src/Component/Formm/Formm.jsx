import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import getRec from '../../helper'
import NotData from '../../assets/notdata.png'
import './Formm.css'

function Formm() {

    const [formInput, setFormInput] = useState({
        id: '',  
        fname: '',
        lname: '',
        email: '',
        address: '',
        phone: '',
        hdate: '',
        salary: '',

    });

    const [storage, setStorage] = useState(getRec());

    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormInput({ ...formInput, [name]: value });
    };

    const handelEditData = (id) => {
        let editData = storage.find((d) => {
            return d.id === id;
        });
        setFormInput(editData); 
    };

    const handeldeleteData = (id) => {
        let deleteData = storage.filter((d) => {

            return d.id !== id;
        });
        setStorage(deleteData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formInput.id) {

            const updatedStorage = storage.map((rec) => {
                if (rec.id === formInput.id) {
                    return { ...formInput };
                } else {
                    return rec;
                }
            });
            setStorage(updatedStorage);
        } else {
            const newFormInput = { ...formInput, id: Math.floor(Math.random() * 10000) };
            setStorage([...storage, newFormInput]);
        }

        setFormInput({
            id: '', 
            fname: '',
            lname: '',
            email: '',
            address: '',
            phone: '',
            hdate: '',
            salary: '',
        });
    };

    useEffect(() => {
        localStorage.setItem('storage', JSON.stringify(storage));
    }, [storage]);

    return (
        <>
            <Container>

                <h1 className='text-center fw-bold mb-5'>Employee Management</h1>

                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="fname" className="form-label fw-semibold">First Name :</label>
                        <input type="text" className="form-control" name='fname' id="fname" placeholder="First Name" value={formInput.fname} onChange={handleForm} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lname" className="form-label fw-semibold">Last Name :</label>
                        <input type="text" className="form-control" name='lname' id="lname" placeholder="Last Name" value={formInput.lname} onChange={handleForm} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label fw-semibold">Email :</label>
                        <input type="email" className="form-control" name='email' id="email" placeholder="Email" value={formInput.email} onChange={handleForm} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label fw-semibold">Phone :</label>
                        <input type="number" className="form-control" name='phone' id="phone" placeholder="Phone" value={formInput.phone} onChange={handleForm} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="hdate" className="form-label fw-semibold">Hired date :</label>
                        <input type="date" className="form-control" name='hdate' id="hdate" placeholder="Hired date" value={formInput.hdate} onChange={handleForm} required/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="salary" className="form-label fw-semibold">Salary :</label>
                        <input type="number" className="form-control" name='salary' id="salary" placeholder="Salary" value={formInput.salary} onChange={handleForm} required/>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="address" className="form-label fw-semibold">Address :</label>
                        <textarea  type="text" className="form-control" rows="3" cols="50" name='address' id="address" placeholder="Address" value={formInput.address} onChange={handleForm} required>
                        </ textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {formInput.id ? "Update" : "Add"}
                        </button>
                    </div>
                </form>

                <div className='mt-5'>
                <h1 className='text-center fw-bold mb-5'>View Data</h1>
                {

                storage.length === 0 ? (
                <div className='no-data text-center'>
                        <img src={NotData} />
                </div>
            ) : (
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone</th>
                                <th scope='col'>Hired date</th>
                                <th scope='col'>Salary</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                storage.map((data, index) => (
                                    <tr key={data.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td>{data.fname}</td>
                                        <td>{data.lname}</td>
                                        <td>{data.email}</td>
                                        <td>{data.address}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.hdate}</td>
                                        <td>{data.salary}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => handelEditData(data.id)}>Edit</button>&nbsp;||&nbsp;
                                            <button className='btn btn-danger' onClick={() => handeldeleteData(data.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            )  }
                </div>
            </Container>
        </>
    );
}

export default Formm;
