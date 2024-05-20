import React, { useState, useEffect } from 'react';
import './PersonalArea.css';
import { updateUserInfo, getUserInfo,updatePassword,updateEmail } from '../../http/userAPI';


const PersonalArea = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('personal');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [sex, setSex] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
        setName(userData.name);
        setSurname(userData.surname || '');
        setSex(userData.sex);
        setPhoneNumber(userData.phoneNumber || '');
        setEmail(userData.email);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleEditPersonalClick = () => {
    setIsEditingPersonal(true);
  };

  const handleSavePersonalClick = async () => {
    try {
      if (password && password !== confirmPassword) {
        setPasswordError('Пароли не совпадают');
        return;
      }
      
      if (password) {
        await updatePassword(password, confirmPassword);
      }
      
      const updatedUserInfo = { name, surname, sex, phoneNumber };
      await updateUserInfo(updatedUserInfo);
      
      setUserInfo({ ...userInfo, ...updatedUserInfo });
      setIsEditingPersonal(false);
      setPasswordError('');
    } catch (error) {
      console.error('Ошибка при обновлении информации о пользователе:', error);
    }
  };
  
  const handleSaveEmailClick = async () => {
    try {
      await updateEmail(newEmail);
      setEmail(newEmail);
      setNewEmail('');
      console.log('Email успешно обновлен');
    } catch (error) {
      console.error('Ошибка при обновлении email:', error);
    }
  };
  
  const handleCancelPersonalClick = () => {
    setIsEditingPersonal(false);
    setName(userInfo.name);
    setSurname(userInfo.surname || '');
    setSex(userInfo.sex || '');
    setPhoneNumber(userInfo.phoneNumber || '');
    setPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  

  return (
    <div className="personal-area">
      <div className="menu">
        <button id='personal' onClick={() => handleSectionChange('personal')}>Личная информация</button>
        <button onClick={() => handleSectionChange('orders')}>Заказы</button>
      </div>
      
      <div className="cardAc">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentSection === 'personal' && (
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <h2>Личная информация</h2>
                  {!isEditingPersonal ? (
                    <div className="info-container">
                      <div className="info-item">
                        <div className="info-row">
                          <span className="info-label-name">Имя:</span> {name}
                          <span className="info-label-sname">Фамилия:</span> {surname}
                        </div>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Пол:</span> {sex}
                      </div>
                      <div className="info-item">
                        <span className="info-label">Телефон:</span> {phoneNumber}
                      </div>
                      <div className="info-item">
                        <span className="info-label">Почта:</span> {email}
                      </div>
                      
                      <button id='change' onClick={handleEditPersonalClick}>Изменить</button>
                    </div>
                    
                    
                  ) : (
                    <div>
                      <div className="info-container">
                        <div className="info-row">
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
                            <label htmlFor="gender">Пол:</label>
                            <select id="gender" value={sex} onChange={(e) => setSex(e.target.value)}>
                              <option value="Мужчина">М</option>
                              <option value="Женщина">Ж</option>
                            </select>
                          </div>
                        </div>
                        <div className="info-row">
                          <div className="form-group">
                            <label htmlFor="phone">Номер телефона:</label>
                            <input
                              type="text"
                              id="phone"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Почта:</label>
                            <input
                              type="email"
                              id="email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <br></br>
                            <button onClick={handleSaveEmailClick}>Сохранить почту</button>
                          </div>
                        </div>
                        <div className="info-row">
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
                        </div>
                        <p style={{marginTop:"-1.8vw"}}>
                          Если вы хотите сменить пароль, то заполните эти поля, если нет, то оставьте их пустыми
                        </p>
                        {passwordError && <p style={{ color: 'red',marginTop:"-2vw" }}>{passwordError}</p>}
                        <div className="info-row">
                          <button id='changec' onClick={handleCancelPersonalClick}>Отмена</button>
                          <button id='changes' onClick={handleSavePersonalClick}>Сохранить</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            )}

            {currentSection === 'orders' && (
              <div>
                <h2>Заказы</h2>
                <p>Coming Soon 😁</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalArea;
