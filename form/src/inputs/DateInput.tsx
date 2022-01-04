import { Controller } from 'react-hook-form'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TextField from '@mui/material/TextField'

function DateInput({ name, control, label }: { name: string, control: any, label: string }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label={label}
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={onChange}
                        renderInput={({ error, ...params }) =>
                            <TextField
                                sx={{ marginTop: '6px' }}
                                {...params}
                                variant='standard'
                            />
                        }
                    />
                </LocalizationProvider>
            )}
        />
    )
}

export default DateInput