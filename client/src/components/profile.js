import React, { useEffect, useState } from 'react';
import '../styles/card.css';
import { Link } from 'react-router-dom';

const Profile = ( username ) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sugar, setSugar] = useState('');
  const [bp, setBP] = useState('');
  const [chola, setChola] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [consultationDate, setConsultationDate] = useState('');
  const [nextConsultancyDays, setNextConsultancyDays] = useState('');
  const [newMedicineName, setNewMedicineName] = useState('');
  const [newMedicineTimings, setNewMedicineTimings] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSugarChange = (event) => {
    setSugar(event.target.value);
  };

  const handleBPChange = (event) => {
    setBP(event.target.value);
  };

  const handleCholaChange = (event) => {
    setChola(event.target.value);
  };

  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
  };

  const handleConsultationDateChange = (event) => {
    setConsultationDate(event.target.value);
  };

  const handleNextConsultancyDaysChange = (event) => {
    setNextConsultancyDays(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setIsEditing(false);
    console.log('Saved Name:', name);
    console.log('Saved Age:', age);
    console.log('Saved Sugar Level:', sugar);
    console.log('Saved Blood Pressure:', bp);
    console.log('Saved Cholesterol:', chola);
    console.log('Saved Doctor Name:', doctorName);
    console.log('Saved Consultation Date:', consultationDate);
    console.log('Saved Next Consultancy Days:', nextConsultancyDays);
  };

  const handleAddMedicine = () => {
    if (newMedicineName && newMedicineTimings) {
      const newMedicine = { name: newMedicineName, timings: newMedicineTimings };
      setMedicines((prevMedicines) => [...prevMedicines, newMedicine]);
      setNewMedicineName('');
      setNewMedicineTimings('');
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3002/profile/${username}`)
      .then(response => response.json())
      .then(data => {
        setName(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [username]);

  return (
    <div id='profile'>
      <h1 className='h'>Profile Details</h1>

      <div className='card-container'>
        <div className='card'>
          <h2 className='h2'>Health Condition</h2>
          {isEditing ? (
            <div className='p1'>
            <form onSubmit={handleSave}>
              <label>
                Name:
                <input
                  type='text'
                  className='input'
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
              <br />
              <label>
                Age:
                <input
                  type='text'
                  className='input'
                  value={age}
                  onChange={handleAgeChange}
                />
              </label>
              <br />
              <label>
                Sugar Level:
                <input
                  type='text'
                  className='input'
                  value={sugar}
                  onChange={handleSugarChange}
                />
              </label>
              <br />
              <label>
                Blood Pressure:
                <input
                  type='text'
                  className='input'
                  value={bp}
                  onChange={handleBPChange}
                />
              </label>
              <br />
              <label>
                Cholesterol:
                <input
                  type='text'
                  className='input'
                  value={chola}
                  onChange={handleCholaChange}
                />
              </label>
              <br />
              <button  className='button1' type='submit'>Save</button>
            </form>
            </div>
          ) : (
            <div className='p1'>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Sugar Level: {sugar}</p>
              <p>Blood Pressure: {bp}</p>
              <p>Cholesterol: {chola}</p>
              <button className='button1' onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
        <div className='card'>
          <h2 className='h2'>Medicine Details</h2>
          <div>
            {medicines.map((medicine, index) => (
              <div  className='p2' key={index}>
                <p>Name: {medicine.name}</p>
                <p>Timings: {medicine.timings}</p>
              </div>
            ))}
            {!isEditing && (
              <div className='p1'>
                <label>
                  Medicine Name:
                  <input
                    type='text'
                    className='input'
                    value={newMedicineName}
                    onChange={(e) => setNewMedicineName(e.target.value)}
                  />
                </label>
                <br />
                {/* <label>
                   Timings:
                  <input
                    type='text'
                    className='input'
                    value={newMedicineTimings}
                    onChange={(e) => setNewMedicineTimings(e.target.value)}
                  />
                </label> */}
                <br />
                <Link to="/reminder"><button className='button1'>Set Reminder</button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className='card'>
          <h2 className='h2'>Consultant Details</h2>
          {isEditing ? (
            <div className='p3'>
            <form onSubmit={handleSave}>
              <label>
                Doctor Name:
                <input
                  type='text'
                  className='input'
                  value={doctorName}
                  onChange={handleDoctorNameChange}
                />
              </label>
              <br />
              <label>
                Consultation Date:
                <input
                  type='text'
                  className='input'
                  value={consultationDate}
                  onChange={handleConsultationDateChange}
                />
              </label>
              <br />
              <label>
                Days for Next Consultancy:
                <input
                  type='text'
                  className='input'
                  value={nextConsultancyDays}
                  onChange={handleNextConsultancyDaysChange}
                />
              </label>
              <br />
              <button  className='button1' type='submit'>Save</button>
            </form>
            </div>
          ) : (
            <div className='p1'>
              <p>Doctor Name: {doctorName}</p>
              <p>Consultation Date: {consultationDate}</p>
              <p>Days for Next Consultancy: {nextConsultancyDays}</p>
              <button  className='button1' onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;