import {Button} from "@mui/material";
import MenuAction from "../../../../../components/menuAction/MenuAction";

function Notes({notes}) {

    return (
        <div >

            <div className={'text-end'}>
                <Button variant={'contained'}>Create Note</Button>
            </div>

            <div className={'mt-3'}>
                {notes.map(note => {
                    return (
                        <div key={note.noteId} className={'card p-3 w-100'}>

                            <div className={'d-flex justify-content-between'}>
                                <strong>Note</strong>
                                <MenuAction />
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
