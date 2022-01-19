import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { saveForm, BUTTON_STYLE } from '../exports/constants'

function FormButtons({ token, id, getValues, openResultDialog }:
    { token: string, id: string, getValues: any, openResultDialog: any }) {

    const style = {
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'center'
    }

    const handleSave = () => {
        saveForm(id, token, getValues)
        openResultDialog({ loading: false, title: 'Save', description: 'Save completed.' })
    }

    return (
        <Box sx={style}>
            <Button variant='contained' type='button' sx={BUTTON_STYLE} onClick={handleSave}>Save</Button>
            <Button variant='contained' type='submit' sx={BUTTON_STYLE}>Submit</Button>
        </Box>
    )
}

export default FormButtons
