import {DrawerForm} from "../../../../components/drawerForm/DrawerForm";
import {Form} from "antd";
import {Button, TextField} from "@mui/material";
import {authedRequest} from "../../../../http";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {REFRESH_DEAL} from "../../../home/store";


export const EditNote = ({open, setOpen, note}) => {
    const {deal_id} = useParams();
    const dispatch = useDispatch();
    
    const handleSubmit = async (values) => {
        await authedRequest.put(`/api/deal-notes/${note?.noteId}`, {
            content: values.note
        });
        dispatch(REFRESH_DEAL(deal_id));
        setOpen(false);
    }

    if (!note) {
        return <></>
    }

    return (
        <DrawerForm open={open} onClose={() => setOpen(false)}>
            <div className={'p-3'}>

                <h3>Edit Note</h3>

                <Form
                    initialValues={{
                        note: note?.content
                    }}
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
                            variant={'contained'}>Update</Button>
                        <Button
                            onClick={() => setOpen(false)}
                            variant={'contained'}
                            color={'inherit'}>Cancel</Button>
                    </Form.Item>
                </Form>
            </div>
        </DrawerForm>
    )
}
