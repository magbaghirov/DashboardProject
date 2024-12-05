import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Members.module.scss';

function Members() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    gender: '',
    university: '',
    major: '',
    educationLevel: '',
  });
  const [editingMember, setEditingMember] = useState(null);
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000'

  useEffect(() => {
    axios.get(`${apiUrl}/api/members`)
      .then((response) => {
        setData(response.data);
        localStorage.setItem('members', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Məlumat alınmadı:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genderFilter ? member.gender === genderFilter : true)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addMember = () => {
    axios.post(`${apiUrl}/api/members`, newMember)
      .then((response) => {
        setData([...data, response.data]);
        localStorage.setItem('members', JSON.stringify([...data, response.data]));
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Yeni iştirakçı əlavə edilmədi:', error);
      });
  };

  const updateMember = () => {
    axios.put(`${apiUrl}/api/members/${editingMember.id}`, newMember)
      .then((response) => {
        setData(data.map(member => member.id === editingMember.id ? response.data : member));
        localStorage.setItem('members', JSON.stringify(data));
        setShowForm(false);
        setEditingMember(null);
        setNewMember({
          name: '',
          age: '',
          gender: '',
          university: '',
          major: '',
          educationLevel: '',
        });
      })
      .catch((error) => {
        console.error('İştirakçı məlumatları yenilənərkən xəta:', error);
      });
  };

  const deleteMember = (id) => {
    axios.delete(`${apiUrl}/api/members/${id}`)
      .then(() => {
        setData(data.filter(member => member.id !== id));
        localStorage.setItem('members', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('İştirakçı silinərkən xəta:', error);
      });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.membersContainer}>
      <h1>Members</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Axtar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">Hamısı</option>
          <option value="Kişi">Kişi</option>
          <option value="Qadın">Qadın</option>
        </select>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className={styles.addButton}
      >
        Add to Member
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <h2>{editingMember ? 'İştirakçını Yenilə' : 'Yeni İştirakçı Əlavə Et'}</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              placeholder="Ad"
              value={newMember.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Yaş"
              value={newMember.age}
              onChange={handleInputChange}
            />
            <select
              name="gender"
              value={newMember.gender}
              onChange={handleInputChange}
            >
              <option value="">Cins Seçin</option>
              <option value="Kişi">Kişi</option>
              <option value="Qadın">Qadın</option>
            </select>
            <input
              type="text"
              name="university"
              placeholder="Universitet"
              value={newMember.university}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="major"
              placeholder="İxtisas"
              value={newMember.major}
              onChange={handleInputChange}
            />
            <select
              name="educationLevel"
              value={newMember.educationLevel}
              onChange={handleInputChange}
            >
              <option value="">Təhsil Səviyyəsi Seçin</option>
              <option value="Bakalavr">Bakalavr</option>
              <option value="Magistr">Magistr</option>
            </select>
            <button type="button" onClick={editingMember ? updateMember : addMember}>
              {editingMember ? 'Yenilə' : 'Əlavə Et'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>İmtina Et</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Ad</th>
            <th>Yaş</th>
            <th>Cins</th>
            <th>Universitet</th>
            <th>İxtisas</th>
            <th>Təhsil Səviyyəsi</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.gender}</td>
              <td>{member.university}</td>
              <td>{member.major}</td>
              <td>{member.educationLevel}</td>
              <td>
                <button onClick={() => {
                  setEditingMember(member);
                  setNewMember({ ...member });
                  setShowForm(true);
                }} className={styles.updateButton}>Yenilə</button>
                <button onClick={() => deleteMember(member.id)} className={styles.deleteButton}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={goToDashboard} className={styles.backButton}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Members;