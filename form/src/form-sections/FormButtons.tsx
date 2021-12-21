import Button from '@mui/material/Button'

function FormButtons({ handleSubmit, id, token }: { handleSubmit: any, id: string, token: string }) {
    const onSubmit = (data: any) => { console.log(data) }

    return (
        <Button variant='text' onClick={handleSubmit(onSubmit)}>Submit</Button>
    )
}

export default FormButtons