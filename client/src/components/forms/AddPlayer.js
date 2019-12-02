import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/players';

const AddPlayer = ({ addPlayer, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    shirtnumber: '',
    bio: '',
    active: true
  });

  const { name, shirtnumber, bio, active } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = e => {
    setFormData({
      ...formData,
      active: e.target.checked
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    addPlayer(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Lisää pelaaja</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Pelaajan tiedot
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nimi'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <input
            type='number'
            min='1'
            max='100'
            placeholder='Pelinumero'
            name='shirtnumber'
            value={shirtnumber}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            cols='50'
            rows='10'
            wrap='soft'
            placeholder='Esittelyteksti'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='checkbox'
            id='activeCkbx'
            defaultChecked={active}
            name='active'
            onClick={e => handleClick(e)}
          />
          <label for='activeCkbx'> Aktiivinen</label>
        </div>
        <input type='submit' className='btn btn-primary' value='Tallenna' />
      </form>
    </Fragment>
  );
};

AddPlayer.propTypes = {
  addPlayer: PropTypes.func.isRequired
};

export default connect(null, { addPlayer })(withRouter(AddPlayer));
