import React, { useState} from 'react';
import './PersonalArea.css';


const PersonalArea = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('personal');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleEditPersonalClick = () => {
    setIsEditingPersonal(true);
  };

  const handleSavePersonalClick = () => {
    setIsEditingPersonal(false);
  };

  const handleCancelPersonalClick = () => {
    setIsEditingPersonal(false);
  };

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true);
  };

  const handleSavePasswordClick = () => {
    setIsEditingPassword(false);
    setPassword('');
    setConfirmPassword('');
  };

  const handleCancelPasswordClick = () => {
    setIsEditingPassword(false);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="personal-area">
      <div className="menu">
        <button onClick={() => handleSectionChange('personal')}>Личная информация</button>
        <button onClick={() => handleSectionChange('password')}>Пароль</button>
        <button onClick={() => handleSectionChange('orders')}>Заказы</button>
      </div>
      
      <div className="cardAc">
        {currentSection === 'personal' && (
          <div>
            <h2>Личная информация</h2>
            {!isEditingPersonal ? (
              <div>
                <p>Имя: {name}</p>
                <p>Фамилия: {surname}</p>
                {lastName && <p>Отчество: {lastName}</p>}
                <p>Пол: {sex === 'male' ? 'Мужчина' : 'Женщина'}</p>
                <p>Номер телефона: {phoneNumber}</p>
                <button onClick={handleEditPersonalClick}>Изменить</button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">Имя:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Фамилия:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Отчество (необязательно):</label>
                  <input
                    type="text"
                    id="middleName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Пол:</label>
                  <select id="gender" value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="male">Мужчина</option>
                    <option value="female">Женщина</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Номер телефона:</label>
                  <input
                    type="text"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <button onClick={handleSavePersonalClick}>Сохранить</button>
                <button onClick={handleCancelPersonalClick}>Отмена</button>
              </div>
            )}
          </div>
        )}

        {currentSection === 'password' && (
          <div>
            <h2>Пароль</h2>
            {!isEditingPassword ? (
              <div>
                <p>Текущий Email: {email}</p>
                <button onClick={handleEditPasswordClick}>Изменить пароль</button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="email">Новый Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Новый пароль:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleSavePasswordClick}>Сохранить</button>
                <button onClick={handleCancelPasswordClick}>Отмена</button>
              </div>
            )}
          </div>
        )}

        {currentSection === 'orders' && (
          <div>
            <h2>Заказы</h2>
            <p>Coming Soon 😁</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalArea;