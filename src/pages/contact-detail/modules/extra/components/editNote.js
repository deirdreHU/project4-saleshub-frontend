import {Button, TextField} from "@mui/material";
import {DrawerForm} from "../../../../../components/drawerForm/DrawerForm";
import {Form} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authedRequest} from "../../../../../http";
import {REFRESH_CONTACT} from "../../../../home/store";

export const EditNote = ({note, open, setOpen}) => {
    const {contact_id} = useParams();
    const dispatch = useDispatch();
    
    const handleSubmit = async (values) => {
        await authedRequest.put(`/api/notes/${note.noteId}`, {
        content: values.content,
        contact: Number(contact_id)
        });
        setOpen(false);
        dispatch(REFRESH_CONTACT(contact_id));
    }
    if (!note) {
        return <></>;
    }
    return (
        <div>

            <DrawerForm open={open} onClose={() => setOpen(false)}>

                <div className={'p-3'}>

                    <h3>Update Note</h3>

                    <Form
                        initialValues={note}
                        className={'mt-3'}
                        onFinish={handleSubmit}>

                        <Form.Item
                            name={'content'}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the note content..."
                                }
                            ]}>

                            <TextField
                                multiline
                                rows={5}
                                fullWidth
                                variant={'outlined'}
                                placeholder={'Enter your note here...'}
                                label={'Contact note'}/>

                        </Form.Item>

                        <Form.Item>

                            <Button
                                type={'submit'}
                                className={'me-2'}
                                variant={'contained'}>Update</Button>
                            <Button
                                onClick={() => setOpen(false)}
                                variant={'contained'}
                                color={'inherit'}>Cancel</Button>

                        </Form.Item>

                    </Form>
                    
                </div>

            </DrawerForm>
            
        </div>
    )
    }
