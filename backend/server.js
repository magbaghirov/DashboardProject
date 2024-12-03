const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let members = [
  { id: 1, name: 'Nigar Baxşıyeva', age: 20, gender: 'Qadın', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'İnformasiya Texnologiyaları', educationLevel: 'Bakalavr' },
  { id: 2, name: 'Fidan Məmmədova', age: 23, gender: 'Qadın', university: 'Xəzər Universiteti', major: 'Mühasibat uçotu və audit', educationLevel: 'Magistr' },
  { id: 3, name: 'Xatirə Qarayeva', age: 20, gender: 'Qadın', university: 'BDU', major: 'Kompüter Elmləri', educationLevel: 'Bakalavr' },
  { id: 4, name: 'İlahə Behbudova', age: 23, gender: 'Qadın', university: 'ADA Universiteti', major: 'İnformasiya Texnologiyaları', educationLevel: 'Bakalavr' },
  { id: 5, name: 'Fidan Əhmədova', age: 20, gender: 'Qadın', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'Maliyyə', educationLevel: 'Bakalavr' },
  { id: 6, name: 'Nurşən İbrahimovaa', age: 21, gender: 'Qadın', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'Mühasibatlıq', educationLevel: 'Bakalavr' },
  { id: 7, name: 'Fatimə Gözəl', age: 18, gender: 'Qadın', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'Maliyyə', educationLevel: 'Bakalavr' },
  { id: 8, name: 'Samid Quliyev', age: 21, gender: 'Kişi', university: 'Azərbaycan Dövlət Neft və Sənaye Universiteti', major: 'İnformasiya Texnologiyaları', educationLevel: 'Magistr' },
  { id: 9, name: 'Nərmin Müzəffərova', age: 21, gender: 'Qadın', university: 'Azərbaycan Dövlət Neft və Sənaye Universiteti', major: 'Kimya mühəndisliyi', educationLevel: 'Bakalavr' },
  { id: 10, name: 'Ləman Nuriyeva', age: 18, gender: 'Qadın', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'Kompüter Elmləri', educationLevel: 'Bakalavr' },
  { id: 11, name: 'Süleyman Alməmmədov', age: 20, gender: 'Kişi', university: 'Azərbaycan Dövlət Gömrük Komitəsi Akademiyası', major: 'Beynəlxalq ticarət və logistika', educationLevel: 'Bakalavr' },
  { id: 12, name: 'Turanə Qurbanzadə', age: 20, gender: 'Qadın', university: 'Bakı Dövlət Universiteti', major: 'Tarix müəllimliyi', educationLevel: 'Bakalavr' },
  { id: 13, name: 'Murad Əhmədli', age: 20, gender: 'Kişi', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'İqtisadiyyat və idarəetmə', educationLevel: 'Bakalavr' },
  { id: 14, name: 'Gülçin İsgəndərova', age: 20, gender: 'Qadın', university: 'Azərbaycan Memarlıq və İnşaat Universiteti', major: 'İnformasiya Texnologiyaları', educationLevel: 'Bakalavr' },
  { id: 15, name: 'Yəmən Ərzumanova', age: 20, gender: 'Qadın', university: 'Dövlət İdarəçilik Akademiyası', major: 'Kompüter Elmləri', educationLevel: 'Bakalavr' },
  { id: 16, name: 'Gülxar Mehtili', age: 20, gender: 'Qadın', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'Mühasibatlıq', educationLevel: 'Bakalavr' },
  { id: 17, name: 'Eltac Məhərrəmli', age: 20, gender: 'Kişi', university: 'Azərbaycan Dövlət Neft və Sənaye Universiteti', major: 'Kompüter Mühəndisliyi', educationLevel: 'Bakalavr' },
  { id: 18, name: 'İbrahim Məmmədov', age: 19, gender: 'Kişi', university: 'Dövlət İdarəçilik Akademiyası', major: 'Kompüter Elmləri', educationLevel: 'Bakalavr' },
  { id: 19, name: 'Leyla Məmmədova', age: 20, gender: 'Qadın', university: 'Bakı Dövlət Universiteti', major: 'İnformasiya Təhlükəsizliyi', educationLevel: 'Bakalavr' },
  { id: 20, name: 'Telman Məmmədov', age: 20, gender: 'Kişi', university: 'Xəzər Universiteti', major: 'Kompüter Mühəndisliyi', educationLevel: 'Bakalavr' },
  { id: 21, name: 'Leyla Əliyeva', age: 22, gender: 'Qadın', university: 'Azərbaycan Universiteti', major: 'İnformasiya Texnologiyaları', educationLevel: 'Bakalavr' },
  { id: 22, name: 'Gülbahar Hüseynzadə', age: 20, gender: 'Qadın', university: 'BDU', major: 'Ekologiya', educationLevel: 'Bakalavr' },
  { id: 23, name: 'Aytən İbrahimova', age: 21, gender: 'Qadın', university: 'Bakı Avrasiya Universiteti', major: 'Mühasibatlıq', educationLevel: 'Bakalavr' },
  { id: 24, name: 'Murad Həsənov', age: 20, gender: 'Kişi', university: 'Azərbaycan Dövlət Gömrük Komitəsi Akademiyası', major: 'İnformasiya Texnologiyaları', educationLevel: 'Bakalavr' },
  { id: 25, name: 'Bayram Fətullayev', age: 19, gender: 'Kişi', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'Biznesin idarə edilməsi', educationLevel: 'Bakalavr' },
  { id: 26, name: 'Zakir Əhmədov', age: 21, gender: 'Kişi', university: 'Azərbaycan Dövlət İqtisad Universiteti', major: 'İnformasiya Texnologiyaları', educationLevel: 'Magistr' },
];

app.get('/api/members', (req, res) => {
  res.json(members);
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  newMember.id = Date.now(); 
  members.push(newMember); 
  res.status(201).json(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;

  let memberIndex = members.findIndex(member => member.id == id);
  
  if (memberIndex !== -1) {
    members[memberIndex] = { ...members[memberIndex], ...updatedMember };
    res.json(members[memberIndex]); 
  } else {
    res.status(404).json({ message: 'İştirakçı tapılmadı' });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const memberIndex = members.findIndex(member => member.id == id);

  if (memberIndex !== -1) {
    members.splice(memberIndex, 1); 
    res.status(200).json({ message: 'İştirakçı silindi' });
  } else {
    res.status(404).json({ message: 'İştirakçı tapılmadı' });
  }
});

const events = [
  { id: 1, name: 'React Workshop', date: '2024-12-05', time: '10:00 AM', description: 'Learn React basics' },
  { id: 2, name: 'JavaScript Conference', date: '2024-12-10', time: '2:00 PM', description: 'Advanced JavaScript topics' },
  { id: 3, name: 'Frontend Meetup', date: '2024-12-15', time: '9:00 PM', description: 'Networking for front-end developers' }
];

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    newEvent.id = Date.now(); 
    events.push(newEvent); 
    res.status(201).json(newEvent); 
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;

  let eventIndex = events.findIndex(event => event.id == id);
  
  if (eventIndex !== -1) {
    events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
    res.json(events[eventIndex]);
  } else {
    res.status(404).json({ message: 'Tədbir tapılmadı' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex(event => event.id == id);

  if (eventIndex !== -1) {
    events.splice(eventIndex, 1); 
    res.status(200).json({ message: 'Tədbir silindi' });
  } else {
    res.status(404).json({ message: 'Tədbir tapılmadı' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});