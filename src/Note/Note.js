import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulContext from '../notefulContext'
import './Note.css'

export default function Note(props) {
  return (
    <NotefulContext.Consumer>
      {({deleteNote}) => (
       
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick ={e => deleteNote(props.id)}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
    )}
    </NotefulContext.Consumer>
  )
}