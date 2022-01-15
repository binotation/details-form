import { Controller } from 'react-hook-form'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'

function DropdownInput({ name, control, label, choices, shrink }:
    { name: string, control: any, label: string, choices: any, shrink?: boolean }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <FormControl sx={{ marginTop: '12px' }}>
                    <InputLabel id={name + '-label'} error={invalid} sx={{ marginLeft: '-14px' }} shrink={shrink}>{label}</InputLabel>
                    <Select
                        onChange={onChange}
                        value={value}
                        labelId={name + '-label'}
                        variant='standard'
                        error={invalid}
                    >
                        {choices.map((choice: any, index: number) => (
                            <MenuItem key={index} value={choice.value}>
                                {choice.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={invalid} sx={{ marginLeft: '0px' }}>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default DropdownInput
