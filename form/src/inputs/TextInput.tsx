import { Control, Controller } from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'

function TextInput({ name, control, label, textFieldParams }:
    { name: string, control: Control<any, Object>, label: string, textFieldParams?: TextFieldProps }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <TextField
                    id={name}
                    onChange={onChange}
                    value={value}
                    variant='standard'
                    label={label}
                    error={invalid}
                    helperText={error?.message}
                    sx={{ marginTop: '6px' }}
                    {...textFieldParams}
                />
            )}
        />
    )
}

export default TextInput
