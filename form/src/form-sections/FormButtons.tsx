import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

function FormButtons({ handleSubmit, id, token }: { handleSubmit: any, id: string, token: string }) {
    const onSubmit = (data: any) => { console.log(data) }

    const style = {
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'center'
    }

    return (
        <Box sx={style}>
            <Button variant='contained' onClick={handleSubmit(onSubmit)}>Submit</Button>
        </Box>
    )
}

export default FormButtons