import { Control, Controller } from 'react-hook-form'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TextField from '@mui/material/TextField'

function DateInput({ name, control, label }: { name: string, control: Control<any, Object>, label: string }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label={label}
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={onChange}
                        renderInput={({ ...params }) =>
                            <TextField
                                id={name}
                                sx={{ marginTop: '6px' }}
                                {...params}
                                error={invalid}
                                helperText={error?.message}
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
