import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import NotefulContext from '../notefulContext';
import NotefulForm from '../NotefulForm/NotefulForm';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // const url = (``)
        fetch(`http://localhost:9090/notes`)
        .then(response => {
            if(response.ok){
                return response.json()
            }
                throw new Error(response.statusText)
            
        })
        .then(data => {
            this.setState({notes: data})
            console.log(data)
        })
       

        fetch(`http://localhost:9090/folders`)
        .then(response => {
            if(response.ok){
                return response.json()
            }
                throw new Error(response.statusText)
            
        })
        .then(data => this.setState({folders: data}))


        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
    }

    deleteNote = (noteId) => {
        // console.log(noteId)
        fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }

    })
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText)
              
            }
                this.setState({
                    notes: this.state.notes.filter(note => note.id !== noteId)
                })                    
                
        })
    
}

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />

            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
                <Route 
                path="/add-note" 
                component={NotefulForm} />;
            </>
        );
    }

    render() {
        const value = {
        deleteNote: this.deleteNote,
        folders: this.state.folders
    }
        return (
            <div className="App">
                <NotefulContext.Provider value = {value}>

                
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </NotefulContext.Provider>
            </div>
        );
    }
}



export default App;