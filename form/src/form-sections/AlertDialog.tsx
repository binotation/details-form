import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

function AlertDialog({ open, handleOk, title, description }:
    { open: boolean, handleOk: any, title: string, description: string }) {

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog