import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profile__icon.svg'
import './ProfileLink.css'

function ProfileLink() {
  return (
    <Link className="profile-link" to="/profile">
      <p className="profile-link__title">Аккаунт</p>
      <img className="profile-link__icon" src={profileIcon} alt="Аккаунт" />
    </Link>
  );
}

export default ProfileLink;
