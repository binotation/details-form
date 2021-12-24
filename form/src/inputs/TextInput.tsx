import { Controller } from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'

function TextInput({ name, control, label, textFieldParams }: { name: string, control: any, label: string, textFieldParams?: TextFieldProps }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} variant='standard' label={label} {...textFieldParams} />
            )}
        />
    )
}

export default TextInput