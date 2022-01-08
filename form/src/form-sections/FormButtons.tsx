import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Cookies from 'universal-cookie'
import CryptoJS from 'crypto-js'

function FormButtons({ token, id, getValues }: { token: string, id: string, getValues: any }) {
    const style = {
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'center'
    }

    const buttonStyle = { margin: '0px 8px 0px 8px' }
    const saveHandler = () => {
        const cipher = CryptoJS.AES.encrypt(JSON.stringify(getValues()), CryptoJS.SHA256(token).toString())
        const cookies = new Cookies()
        const maxAge = 7 * 24 * 60 * 60 // 7 days
        cookies.set('savedData-' + id, cipher.toString(), { path: '/', sameSite: 'strict', maxAge })
    }

    return (
        <Box sx={style}>
            <Button variant='contained' type='submit' sx={buttonStyle}>Submit</Button>
            <Button variant='contained' type='button' sx={buttonStyle} onClick={saveHandler}>Save</Button>
        </Box>
    )
}

export default FormButtons