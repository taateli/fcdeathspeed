import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Player = ({
  player: { _id, name, shirtnumber, goals, assists, bio, appearences },
  isAuthenticated
}) => {
  return (
    <div className='player bg-light'>
      <div>
        <h2>{name}</h2>
        <p> Pelinumero: {shirtnumber}</p>
      </div>
      <div>
        <p>Ottelut: {appearences}</p>
        <p>
          Tehot: {goals + assists} {'(' + goals + ' + ' + assists + ')'}
        </p>

        <p>
          {isAuthenticated && (
            <Link to={`/player/${_id}`} className='btn btn-primary'>
              Muokkaa
            </Link>
          )}
        </p>
      </div>
      <div>
        <h2>Esittely</h2>
        <p>{bio}</p>
      </div>
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Player);
