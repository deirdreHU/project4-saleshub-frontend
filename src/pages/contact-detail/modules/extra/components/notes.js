import MenuAction from "../../../../../components/menuAction/MenuAction";
import {CreateNote} from "./createNote";
import {EditNote} from "./editNote";

import {useState} from "react";

import {authedRequest} from "../../../../../http";
import {useDispatch} from "react-redux";
import {REFRESH_CONTACT} from "../../../../home/store";
import {useParams} from "react-router-dom";
import {Modal} from 'antd';

function Notes({notes}) {
    const [note, setNote] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    
    const {contact_id} = useParams();
    const handleDelete = async (noteId) => {

        Modal.confirm({
            content: 'Do you want to delete this note?',
            onOk: async () => {
                await authedRequest.delete(`/api/notes/${noteId}`);
                dispatch(REFRESH_CONTACT(contact_id))
            }
        })

    }

    return (
        <div >

            <div className={'text-end'}>
                <CreateNote />
            </div>

            <EditNote note={note} open={open} setOpen={setOpen} />

            <div className={'mt-3'}>

                {notes.map(note => {

                    return (

                        <div key={note.noteId} className={'card p-3 w-100 mt-2'}>

                            <div className={'d-flex justify-content-between'}>
                        
                                <strong>Note</strong>
                        
                                <MenuAction
                                    onDelete={() => {
                                        handleDelete(note.noteId)
                                    }}
                                    onEdit={() => {
                                        setNote(note);
                                        setOpen(true);
                                    }}/>

                            </div>
                        
                            <p className={'mt-2'}>{note.content}</p>

                            <span className={'text-primary'} role={'button'}>Add Comment</span>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
export default Notes;
