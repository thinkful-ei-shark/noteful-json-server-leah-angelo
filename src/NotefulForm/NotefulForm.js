import React from 'react'
import './NotefulForm.css'
import NotefulContext from '../notefulContext'



export default class NotefulForm extends React.Component {
  handleSubmit = (event)=>{
    event.preventDefault()
    console.log(this.state)

  //using values from the state, call addNote on the context, add on change listeners and add a function to detect when those fields are changing, properties to add are three inputs in the return statement 
  }
  render(){
  const { className, ...otherProps } = this.props
  return (
    <NotefulContext.Consumer>
    {({folders})=>(

    <form
      onSubmit={this.handleSubmit}
      className={['Noteful-form', className].join(' ')}
      action='#'
    >
    <label>
      Name 
    </label>
    <input 
      type='text'> 
    </input>
    <label>
      Content
    </label>
    <input 
      type='text'>
    </input>
    <label>
      Folder
    </label>
    <select>
      {folders.map(folder => (<option value={folder.id}>{folder.name}</option>))}
    </select>
      <button type='submit'>Submit</button>
    </form>
    )}
    
    </NotefulContext.Consumer>
  )
 }
}

//add on submit handler
