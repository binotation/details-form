import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'

function CheckboxInput({ name, control, label }: { name: string, control: any, label: string }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <FormControl sx={{ display: 'flex', flexFlow: 'column', marginTop: '12px' }}>
                    <FormGroup>
                        <FormControlLabel label={label} control={<Checkbox checked={value} onChange={onChange} />} />
                    </FormGroup>
                    <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default CheckboxInput
