import {Button, TextField} from "@mui/material";
import {DrawerForm} from "../../../../../components/drawerForm/DrawerForm";

import {useState} from "react";
import {Form} from "antd";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authedRequest} from "../../../../../http";
import {REFRESH_CONTACT} from "../../../../contacts/store";

export const CreateNote = () => {
    const {contact_id} = useParams();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {

        await authedRequest.post(`/api/notes`, {
            content: values.note,
            contact: Number(contact_id)
        });
        setOpen(false);
        dispatch(REFRESH_CONTACT(contact_id));
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)} variant={'contained'}>Create Note</Button>

            <DrawerForm open={open} onClose = {() => setOpen(false)}>

                <div className={'p-3'}>

                    <h3>Create Note</h3>

                    <Form
                        className={'mt-3'}
                        onFinish={handleSubmit}>
                            <Form.Item
                            name={'note'}
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
                                variant={'contained'}>Create</Button>
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