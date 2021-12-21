import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

function TextInput({ name, control, label }: { name: string, control: any, label: string }) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} variant='standard' label={label} />
            )}
        />
    )
}

export default TextInput