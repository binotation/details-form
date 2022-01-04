import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

function FormButtons() {
    const onSubmit = (data: any) => { console.log(data) }

    const style = {
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <Box sx={style}>
            <Button variant='contained' type='submit'>Submit</Button>
        </Box>
    )
}

export default FormButtons