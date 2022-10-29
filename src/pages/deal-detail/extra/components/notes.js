import MenuAction from "../../../../components/menuAction/MenuAction";
import * as React from "react";
import {Empty} from "antd";
import {EditNote} from "./edit-note";
import {useState} from "react";
import {authedRequest} from "../../../../http";
import {useDispatch} from "react-redux";
import {REFRESH_DEAL} from "../../../home/store";
import {useParams} from "react-router-dom";

export const Notes = ({notes = []}) => {
    const [note, setNote] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const {deal_id} = useParams();

    const handleDelete = async (noteId) => {
        await authedRequest.delete(`/api/deal-notes/${noteId}`);
        dispatch(REFRESH_DEAL(deal_id));
    }

    if (notes.length === 0) {
        return (
        <Empty />
        )
    }

    return (
        <div className={'mt-3'}>

            <EditNote note={note} open={open} setOpen={setOpen}/>

            <div>
                {notes.map(note => {
                    return (
                        <div key={note.noteId} className={'card p-3 w-100 mt-2'}>

                            <div className={'d-flex justify-content-between'}>
                                <div className={'d-flex'}>
                                    <strong className={'me-2'}>Note By</strong>
                                    {note.User.username}
                                </div>

                                <MenuAction
                                    onDelete={() => handleDelete(note.noteId)}
                                    onEdit={() => {
                                        setOpen(true);
                                        setNote(note);
                                    }}
                                />
                                
                            </div>

                            <p className={'mt-2'}>{note.content}</p>

                        </div>
                    )
                })}
            </div>

        </div>
    )
}
