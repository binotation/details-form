import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { saveHandler, buttonStyle } from '../exports/constants'

function FormButtons({ token, id, getValues }: { token: string, id: string, getValues: any }) {
    const style = {
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <Box sx={style}>
            <Button variant='contained' type='button' sx={buttonStyle} onClick={_ => saveHandler(id, token, getValues)}>Save</Button>
            <Button variant='contained' type='submit' sx={buttonStyle}>Submit</Button>
        </Box>
    )
}

export default FormButtons