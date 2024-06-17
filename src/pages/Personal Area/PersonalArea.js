import React, { useState, useEffect } from 'react';
import './PersonalArea.css';
import Footer from '../../components/Footer/Footer';
import { updateUserInfo, getUserInfo, updatePassword, updateEmail } from '../../http/userAPI';

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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
    if (!isEditingPersonal) {
      setCurrentSection(section);
    }
  };

  const handleEditPersonalClick = () => {
    setIsEditingPersonal(true);
  };

  const handleSavePersonalClick = async () => {
    try {
      const updatedUserInfo = { name, surname, sex, phoneNumber };
      await updateUserInfo(updatedUserInfo);

      setUserInfo({ ...userInfo, ...updatedUserInfo });
      setIsEditingPersonal(false);
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

  const handleSavePasswordClick = async () => {
    try {
      if (newPassword && (newPassword.length < 6 || newPassword.length > 60)) {
        setPasswordError('Пароль должен быть от 6 до 60 символов');
        return;
      }

      if (newPassword && newPassword !== confirmPassword) {
        setPasswordError('Пароли не совпадают');
        return;
      }

      if (newPassword) {
        await updatePassword(oldPassword, newPassword, confirmPassword);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        console.log('Пароль успешно обновлен');
      }
    } catch (error) {
      console.error('Ошибка при обновлении пароля:', error);
    }
  };

  const handleCancelPersonalClick = () => {
    setIsEditingPersonal(false);
    setName(userInfo.name);
    setSurname(userInfo.surname || '');
    setSex(userInfo.sex || '');
    setPhoneNumber(userInfo.phoneNumber || '');
    setNewEmail('');
  };

  const handleCancelPasswordClick = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
     <div>
    <div className="personal-area">
      <div className="menu">
        <button id='personal' onClick={() => handleSectionChange('personal')} disabled={isEditingPersonal}>Личная информация</button>
        <button onClick={() => handleSectionChange('password')} disabled={isEditingPersonal}>Сменить пароль</button>
        <button onClick={() => handleSectionChange('orders')} disabled={isEditingPersonal}>Заказы</button>
      </div>

      <div className="cardAc">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentSection === 'personal' && (
              <div className="info-section">
                {!isEditingPersonal ? (
                  <>
                    <h2>Личная информация</h2>
                    <div className="info-container">
                      <div className="info-item">
                        <span className="info-label-name">Имя:</span> {name}
                      </div>
                      <div className="info-item">
                        <span className="info-label-sname">Фамилия:</span> {surname}
                      </div>
                      <div className="info-item">
                        <span className="info-label">Пол:</span> {sex}
                      </div>
                      <div className="info-item">
                        <span className="info-label">Телефон:</span> {phoneNumber}
                      </div>
                      <button id='change' onClick={handleEditPersonalClick}>Изменить</button>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="info-container">
                      <h4 style={{ textAlign: "center" }}>Редактирование данных</h4>
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
                      </div>
                      <div className="info-row">
                        <div className="form-group">
                          <label id='genderLabel' htmlFor="gender">Пол:</label>
                          <select id="gender" value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
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
                      </div>
                      <div className="button-row">
                        <button id='changec' onClick={handleCancelPersonalClick}>Отмена</button>
                        <button id='changes' onClick={handleSavePersonalClick}>Сохранить</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentSection === 'password' && (
              <div className="info-section">
                <h2>Сменить пароль</h2>
                <div className="form-group">
                  <label htmlFor="oldPassword">Старый пароль:</label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Новый пароль:</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Подтвердите новый пароль:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="button-row">
                  <button onClick={handleSavePasswordClick}>Сохранить</button>
                  <button onClick={handleCancelPasswordClick}>Отмена</button>
                </div>
              </div>
            )}
            {currentSection === 'orders' && (
              <div className="info-section">
                <h2>Заказы</h2>
                {/* Здесь будет отображение заказов */}
              </div>
            )}
          </>
        )}
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default PersonalArea;
