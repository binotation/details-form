import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

function ResultDialog({ open, loading, handleOk, title, description }:
    { open: boolean, handleOk: any, loading: boolean, title: string, description: string }) {

    const renderDialogContent = () => (
        loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}><CircularProgress /></Box> :
            <DialogContentText id="result-dialog-description">
                <TextField
                    value={description}
                    variant='filled'
                    InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                    }}
                    fullWidth
                    multiline
                />
            </DialogContentText>
    )

    const renderDialogActions = () => (
        loading ? null : <Button onClick={handleOk}>OK</Button>
    )

    return (
        <Dialog
            open={open}
            aria-labelledby="result-dialog-title"
            aria-describedby="result-dialog-description"
            fullWidth
        >
            <DialogTitle id="result-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                {renderDialogContent()}
            </DialogContent>
            <DialogActions>
                {renderDialogActions()}
            </DialogActions>
        </Dialog>
    )
}

export default ResultDialog
