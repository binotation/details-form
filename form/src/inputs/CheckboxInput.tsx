import { Controller } from 'react-hook-form'
import { FormControlLabel, Checkbox } from '@mui/material'

function CheckboxInput({ name, control, label }: { name: string, control: any, label: string }) {
    return (
        <FormControlLabel
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            checked={value}
                            onChange={onChange}
                        />
                    )}
                />}
            label={label}
        />
    )
}

export default CheckboxInput